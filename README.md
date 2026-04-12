# aljundi.org

Personal Arabic blog and static website for aljundi.org, built with Eleventy and published through GitHub Pages.

## What This Repository Contains

- Eleventy site templates, content, and configuration.
- Blog posts in `posts/`.
- Site-wide data in `_data/theme.json`.
- Layout templates in `_includes/`.
- Public images in `images/uploads/`.
- Sveltia CMS admin entry point in `admin/`.
- GitHub Pages deployment workflow in `.github/workflows/build.yml`.

## Tech Stack

- Eleventy (`@11ty/eleventy`)
- Nunjucks/HTML templates
- Markdown posts with front matter
- GitHub Pages deployment
- Sveltia CMS for browser-based content editing

## Local Development

Install dependencies:

```bash
npm install
```

Build the site:

```bash
npm run build
```

The generated site is written to `_site/`.

## Deployment

Changes merged to `main` trigger the GitHub Actions workflow in `.github/workflows/build.yml`.

The workflow:

1. Checks out the repository.
2. Installs Node.js 18.
3. Runs `npm install`.
4. Runs `npm run build`.
5. Publishes `_site/` to GitHub Pages.

The custom domain is configured in `CNAME` as `aljundi.org`.

## Content Editing

The `/admin/` page loads Sveltia CMS. The CMS configuration is generated at `/admin/config.yml` from `admin/config.yml.njk`.

Authentication is handled by the separate `sveltia-cms-auth` Cloudflare Worker project. Do not commit OAuth client secrets, personal access tokens, or Cloudflare credentials to this repository.

## Security Notes

- Do not store passwords, API keys, OAuth client secrets, tokens, or private credentials in this repo.
- Public security contact metadata is published at `.well-known/security.txt`.
- The Sveltia CMS script is pinned to a specific package version in `admin/index.html` to avoid unexpectedly loading a newer version.

## Rollback Practice

Before making larger changes, create a backup branch from the current `main` commit and work on a separate `codex/` branch. Prefer pull requests and small commits so changes can be reviewed and reverted cleanly.
