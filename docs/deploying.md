# Deploying and connecting to Vercel

This project includes a GitHub Actions workflow that builds `site` and deploys to Vercel when changes are pushed to `main` or `master`.

Files added:

- `.github/workflows/deploy-to-vercel.yml` — builds `site` and calls the Vercel Action.
- `scripts/publish-to-github.ps1` — helper to create a GitHub repo (via `gh` CLI) and push your workspace.

What you need to do on GitHub/Vercel:

1. Create or use an existing GitHub repository and push this workspace there. Quick option using GitHub CLI:

```powershell
gh auth login
.\scripts\publish-to-github.ps1 your-github-username/your-repo-name
```

2. In your GitHub repository, set these repository secrets (Settings → Secrets & variables → Actions):

- `VERCEL_TOKEN` — create a token in Vercel (Account → Tokens).
- `VERCEL_ORG_ID` — optional but recommended (Project → Settings → General → Project ID / Organization ID).
- `VERCEL_PROJECT_ID` — recommended for precise targeting (from Vercel Project Settings).

3. Push to `main`. The workflow triggers on push and runs:

- `cd site && npm ci`
- `cd site && npm run build`
- `vercel` action to deploy to your Vercel project (production)

Notes:

- If your Vercel project is already connected to the same GitHub repo, Vercel will also perform its own deployments. This workflow is useful when you prefer deploying via GitHub Actions or need custom build steps.
- If you prefer Vercel to manage deployments itself, you can skip adding `VERCEL_*` secrets and rely on Vercel's Git integration.
