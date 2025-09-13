#!/usr/bin/env python3
import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", required=True, help="Repo name")
    parser.add_argument("--pr", required=True, help="Pull request number")
    args = parser.parse_args()

    print(f"🔍 Repo: {args.repo}")
    print(f"📌 PR number: {args.pr}")

if __name__ == "__main__":
    main()