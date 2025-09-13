#!/usr/bin/env python3
import argparse
import os
import requests
from dataclasses import dataclass
from typing import Optional
import cohere

LOW_RISK_DIRECTORIES = ["docs", "documentation", "test", "example"]
LOW_RISK_EXTENSIONS = ["md", "csv", "txt", "yml", "yaml", "json", "lock"]

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

def rerank_filenames(files: list[PRFile], api_key: str) -> list[tuple[str, float]]:
    """
    Use Cohere Rerank API (v2) to rank filenames by semantic 'riskiness'.
    Returns a list of (filename, score), highest first.
    """
    co = cohere.ClientV2(api_key)

    # Build document list with some inline hints for better context
    # docs = []
    # for f in files:
    #     docs.append(f"File: {f.filename} (status={f.status}, +{f.additions}/-{f.deletions})")
    docs = [
        "BUILD.bazel",
        "pkg/BUILD.bazel",
        "pkg/gen/misc.bzl",
        "pkg/sql/lexbase/sql-gen.sh",
        "pkg/sql/parser/statements/BUILD.bazel",
        "pkg/sql/parser/statements/statement.go",
        "pkg/sql/plpgsql/parser/BUILD.bazel",
        "pkg/sql/scanner/BUILD.bazel",
        "pkg/sql/scanner/jsonpath_scan.go",
        "pkg/sql/scanner/plpgsql_scan.go",
        "pkg/sql/scanner/scan.go",
        "pkg/sql/sem/tree/datum.go",
        "pkg/testutils/lint/lint_test.go",
        "pkg/util/jsonpath/BUILD.bazel",
        "pkg/util/jsonpath/expr.go",
        "pkg/util/jsonpath/parser/.gitignore",
        "pkg/util/jsonpath/parser/BUILD.bazel",
        "pkg/util/jsonpath/parser/jsonpath.y",
        "pkg/util/jsonpath/parser/lexbase/.gitignore",
        "pkg/util/jsonpath/parser/lexbase/BUILD.bazel",
        "pkg/util/jsonpath/parser/lexbase/utils.go",
        "pkg/util/jsonpath/parser/lexer.go",
        "pkg/util/jsonpath/parser/parse.go",
        "pkg/util/jsonpath/parser/parser_test.go",
        "pkg/util/jsonpath/parser/testdata/jsonpath",
    ]

    # query = "Rank files by how risky they are to application correctness, security, or business logic."
    query = "Find files that are most risky to application correctness, security, and business logic. Test, documentation, text, and markdown files are not that risky."

    print(docs)
    response = co.rerank(
        model="rerank-v3.5",
        query=query,
        documents=docs,
        top_n=len(docs)
    )
    print(response)

    results = []
    for r in response.results:
        results.append((docs[r.index], r.relevance_score))
    print(results)

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
    # print(prFiles)

    filteredPRFiles = filter_low_risk(prFiles)
    # print(filteredPRFiles)

    print(len(prFiles))
    print(len(filteredPRFiles))

    rerank_filenames(prFiles, cohere_api_key)

    body = f"Testing 1"
    with open(githubOutput, "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()

"""
- string matching/classification on filepaths (high risk vs low risk)
- filenames (extensions)
"""