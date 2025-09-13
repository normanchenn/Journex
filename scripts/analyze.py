#!/usr/bin/env python3
import argparse
import os
import requests

def get_pr_files(repo: str, pr_number: int):
    """
    Fetch changed files for a given pull request using GitHub REST API.

    Args:
        repo (str): Repository in the form "owner/repo"
        pr_number (int): Pull request number

    Returns:
        list[dict]: A list of file objects with filename, additions, deletions, and patch keys
    """
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("Missing GITHUB_TOKEN environment variable")

    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/files"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()  # raise error if request failed

    return response.json()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", required=True, help="Repo name")
    parser.add_argument("--pr", required=True, help="Pull request number")
    args = parser.parse_args()

    print(f"🔍 Repo: {args.repo}")
    print(f"📌 PR number: {args.pr}")
    print(get_pr_files(args.repo, args.pr))

    body = f"Testing"
    with open(os.environ["GITHUB_OUTPUT"], "a") as f:
        f.write(f"comment<<EOF\n{body}\nEOF\n")

if __name__ == "__main__":
    main()