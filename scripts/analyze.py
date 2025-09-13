#!/usr/bin/env python3
import argparse
import os
import requests
from dataclasses import dataclass
from typing import Optional

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

    print(f"Repo: {args.repo}")
    print(f"PR: {args.pr}")

    prDiff = get_pr_files(githubToken, args.repo, args.pr)
    prFiles = load_pr_files(prDiff)
    print(prFiles)

    filteredPRFiles = filter_low_risk(prFiles)
    print(filteredPRFiles)

    print(len(prFiles))
    print(len(filteredPRFiles))

    body = f"Testing 1"
    with open(githubOutput, "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()

"""
- string matching/classification on filepaths (high risk vs low risk)
- filenames (extensions)
"""