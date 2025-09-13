#!/usr/bin/env python3
import json
import argparse
import os
import requests
from dataclasses import dataclass
from typing import Optional
import cohere
from cohere import ClassifyExample

LOW_RISK_DIRECTORIES = ["docs", "documentation", "test", "example"]
LOW_RISK_EXTENSIONS = ["md", "csv", "txt", "json", "lock"]

@dataclass
class PRFile:
    sha: str
    filename: str
    status: str
    additions: int
    deletions: int
    changes: int
    blob_url: str
    raw_url: str
    contents_url: str
    patch: Optional[str] = None

def rank_filenames(files: list[PRFile], api_key: str) -> list[tuple[str, float, str]]:
    """
    Given a list of PRFile objects, use Cohere Chat API to rank filenames by risk.
    Returns list of (filename, risk_score, reason), sorted high → low.
    """
    co = cohere.ClientV2(api_key)

    file_list_str = "\n".join(f.filename for f in files)

    prompt = f"""
You are a code review assistant.
Given a list of filenames, rank them by how risky they are 
to application correctness, security, and business logic.

Rules:
- High risk: authentication, payments, core business logic, db models/migrations
- Medium risk: configs, build scripts, CI/CD
- Low risk: docs, tests, markdown, lockfiles

For each file, return:
- filename
- risk_score (0.0 to 1.0, higher = riskier)
- reason (short sentence)

Respond ONLY with a JSON object: {{ "files": [ ... ] }}, 
where files is sorted highest → lowest risk.

Filenames:
{file_list_str}
"""

    resp = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": prompt}],
        response_format={
            "type": "json_object",
            "json_schema": {
                "type": "object",
                "properties": {
                    "files": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "filename": {"type": "string"},
                                "risk_score": {"type": "number"},
                                "reason": {"type": "string"}
                            },
                            "required": ["filename", "risk_score", "reason"]
                        }
                    }
                },
                "required": ["files"]
            }
        },
    )

    data = json.loads(resp.message.content[0].text)

    results: list[tuple[str, float, str]] = []
    for f in data["files"]:
        results.append((f["filename"], float(f["risk_score"]), f["reason"]))

    return results

def is_low_risk_file(prfile: PRFile) -> bool:
    filename = prfile.filename.lower()

    for d in LOW_RISK_DIRECTORIES:
        if d in filename:
            return True
    
    _, ext = os.path.splitext(filename)
    if ext and ext.startswith("."):
        ext = ext[1:]
    if ext in LOW_RISK_EXTENSIONS:
        return True

    return False

def filter_low_risk(prfiles: list[PRFile]) -> list[PRFile]:
    return [f for f in prfiles if is_low_risk_file(f)]

def load_pr_files(pr_json_data: str) -> list[PRFile]:
    return [PRFile(**item) for item in pr_json_data]

def get_pr_files(token: str, repo: str, pr_number: int):
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/files"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

# docs = [
#     "BUILD.bazel",
#     "pkg/BUILD.bazel",
#     "pkg/gen/misc.bzl",
#     "pkg/sql/lexbase/sql-gen.sh",
#     "pkg/sql/parser/statements/BUILD.bazel",
#     "pkg/sql/parser/statements/statement.go",
#     "pkg/sql/plpgsql/parser/BUILD.bazel",
#     "pkg/sql/scanner/BUILD.bazel",
#     "pkg/sql/scanner/jsonpath_scan.go",
#     "pkg/sql/scanner/plpgsql_scan.go",
#     "pkg/sql/scanner/scan.go",
#     "pkg/sql/sem/tree/datum.go",
#     "pkg/testutils/lint/lint_test.go",
#     "pkg/util/jsonpath/BUILD.bazel",
#     "pkg/util/jsonpath/expr.go",
#     "pkg/util/jsonpath/parser/.gitignore",
#     "pkg/util/jsonpath/parser/BUILD.bazel",
#     "pkg/util/jsonpath/parser/jsonpath.y",
#     "pkg/util/jsonpath/parser/lexbase/.gitignore",
#     "pkg/util/jsonpath/parser/lexbase/BUILD.bazel",
#     "pkg/util/jsonpath/parser/lexbase/utils.go",
#     "pkg/util/jsonpath/parser/lexer.go",
#     "pkg/util/jsonpath/parser/parse.go",
#     "pkg/util/jsonpath/parser/parser_test.go",
#     "pkg/util/jsonpath/parser/testdata/jsonpath",
# ]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=str, required=True, help="Repo name")
    parser.add_argument("--pr", type=int, required=True, help="Pull request number")
    args = parser.parse_args()

    githubToken = os.environ.get("GITHUB_TOKEN")
    if not githubToken:
        raise RuntimeError("Missing GITHUB_TOKEN environment variable")
    githubOutput = os.environ.get("GITHUB_OUTPUT")
    if not githubOutput:
        raise RuntimeError("Missing GITHUB_OUTPUT environment variable")
    cohere_api_key = os.environ.get("COHERE_API_KEY")
    if not cohere_api_key:
        raise RuntimeError("Missing COHERE_API_KEY environment variable")

    print(f"Repo: {args.repo}")
    print(f"PR: {args.pr}")

    prDiff = get_pr_files(githubToken, args.repo, args.pr)
    prFiles = load_pr_files(prDiff)
    filteredPRFiles = filter_low_risk(prFiles)
    rankedPRFiles = rank_filenames(filteredPRFiles, cohere_api_key)
    print(len(prFiles), [p.filename for p in prFiles])
    print(len(filteredPRFiles), [p.filename for p in filteredPRFiles])
    print(len(rankedPRFiles), [p.filename for p in rankedPRFiles])

    body = f"Testing 1"
    with open(githubOutput, "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()

"""
- string matching/classification on filepaths (high risk vs low risk)
- filenames (extensions)
"""