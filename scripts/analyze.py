#!/usr/bin/env python3
import argparse
import os
import requests
from dataclasses import dataclass
from typing import Optional

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

def load_pr_files(pr_json_data: str) -> list[PRFile]:
    return [PRFile(**item) for item in raw_list]

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

    body = f"Testing 1"
    with open(githubOutput, "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()

"""
- string matching/classification on filepaths (high risk vs low risk)
- filenames (extensions)
"""