#!/usr/bin/env python3
import argparse
import os
import requests
from dataclasses import dataclass
from typing import Optional
import cohere
from cohere import ClassifyExample

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

def classify_filenames(files: list[str], api_key: str) -> list[tuple[str, str, float]]:
    """
    Use Cohere's Classify API to assign filenames into High, Medium, or Low risk.
    Returns a list of (filename, predicted_label, confidence).
    """
    co = cohere.Client(api_key)

    # Define examples for each bucket
    examples = [
        # Low Risk
        ClassifyExample(text="docs/usage.md", label="Low Risk"),
        ClassifyExample(text="tests/test_auth.py", label="Low Risk"),
        ClassifyExample(text="README.md", label="Low Risk"),
        ClassifyExample(text="package-lock.json", label="Low Risk"),

        # Medium Risk
        ClassifyExample(text=".github/workflows/ci.yml", label="Medium Risk"),
        ClassifyExample(text="config/routes.yaml", label="Medium Risk"),
        ClassifyExample(text="scripts/deploy.sh", label="Medium Risk"),

        # High Risk
        ClassifyExample(text="src/auth/login.py", label="High Risk"),
        ClassifyExample(text="core/payment.js", label="High Risk"),
        ClassifyExample(text="db/migrations/001-init.sql", label="High Risk"),
        ClassifyExample(text="src/models/user.py", label="High Risk"),
    ]

    # Call Cohere Classify
    response = co.classify(
        model="large",
        inputs=files,
        examples=examples
    )

    results = []
    for c in response.classifications:
        results.append((c.input, c.prediction, c.confidence))
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
    classify_filenames(docs, cohere_api_key)
    # rerank_filenames(prFiles, cohere_api_key)

    body = f"Testing 1"
    with open(githubOutput, "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()

"""
- string matching/classification on filepaths (high risk vs low risk)
- filenames (extensions)
"""