<#
Publish the current workspace to a new GitHub repository using the GitHub CLI.

Usage:
  PowerShell: .\scripts\publish-to-github.ps1 owner/repo

Prerequisites:
  - Install Git: https://git-scm.com/
  - Install GitHub CLI: https://cli.github.com/
  - Authenticate: `gh auth login`

This script will create the repository (public) and push the current folder as the default branch.
#>

param(
  [Parameter(Mandatory=$true)][string]$repo
)

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI 'gh' not found. Install from https://cli.github.com/"
  exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git not found. Install Git first: https://git-scm.com/"
  exit 1
}

Write-Host "Creating GitHub repository '$repo' and pushing current directory..."

gh repo create $repo --public --source . --remote origin --push

if ($LASTEXITCODE -ne 0) {
  Write-Error "Failed to create or push repository. Check gh auth and repo name."
  exit $LASTEXITCODE
}

Write-Host "Repository created and pushed. Commits to 'main' will trigger the GitHub Actions workflow to build and deploy to Vercel."
