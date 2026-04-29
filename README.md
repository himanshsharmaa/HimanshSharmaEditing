# Himansh Sharma — Portfolio (Vite + React + Tailwind)

This folder contains a production-ready starter built with Vite, React, Tailwind CSS and Framer Motion.

Getting started:

1. From `site/` run:

```bash
npm install
npm run dev
```

2. Open http://localhost:5173

Notes:
- The project focuses on a minimal, editorial layout. Start by editing `src/components/Hero.jsx` and `src/components/WorkList.jsx`.
- Run `npm run build` to build for production. Use a static host (Vercel/Netlify) for CDN + caching.

Important: assets (videos + posters)
- Place your original `assets` folder (videos, posters) into `site/public/assets` so the dev server serves them at `/assets/...`.
- Alternatively on Windows you can create a junction from `site/public/assets` to the workspace `assets` folder:

```powershell
cd site
mklink /J public\assets ..\assets
```

On Unix/macOS:

```bash
cd site
ln -s ../assets public/assets
```

This keeps the original project asset structure while making files available to the Vite dev server.

### Quick deploy options

Below are quick instructions for common hosts.

**GitHub Pages (automatic via Actions)**

1. Create a GitHub repository and push this project.
2. The included workflow `.github/workflows/deploy.yml` builds the site and publishes `site/dist` to the `gh-pages` branch on pushes to `main`/`master`.
3. In the repository settings -> Pages, select the `gh-pages` branch as the source if required and set a custom domain if you have one.

**Netlify**

1. Create a new site in Netlify and connect your repository.
2. Set the build command to: `npm --prefix site run build`
3. Set the publish directory to: `site/dist`
4. The provided `netlify.toml` config ensures a SPA redirect and correct publish dir if Netlify reads the repo root.

**Vercel**

1. Import the repository into Vercel.
2. Set the root to the repository root (Vercel will use `vercel.json`).
3. If Vercel requires custom values, set the build command to `npm --prefix site run build` and the output directory to `site/dist`.

## Final review checklist

- Ensure all large video files are hosted on CDN or external video host for production.
- Replace the placeholder Formspree endpoint in `src/components/Contact.jsx` with your real form handler or Netlify/Server endpoint.
- Verify poster thumbnails are present in `site/public/assets/posters` (or symlink to the workspace `assets/posters`).
- Confirm analytics, privacy (cookie) requirements, and GDPR consent if you plan to collect visitor data.

## How to add your images and videos

- Profile image: place a file at `site/public/assets/profile/profile.{jpg,png,svg}`. Replace the placeholder `profile.svg` included here.
- Posters / thumbnails: place poster images in `site/public/assets/posters/` with names matching the entries in `src/components/WorkList.jsx` (e.g. `poster-1.svg`, `poster-2.svg`, `poster-3.svg`).
- Videos: place your MP4/WebM files in `site/public/assets/videos/` and update `src/components/WorkList.jsx` `projects` array if filenames differ.
 - Or use the new `media.json` manifest: edit `site/public/assets/media.json` and update the `projects` entries (filename only is fine) and `profile` path. The app will load `media.json` on startup so you don't need to edit the React source.
- Recommended sizes:
	- Posters: 1200×720 (or similar 16:9), optimized JPEG/WebP or SVG for small file sizes.
	- Profile: 240×240 or 400×400.
	- Videos: provide H.264 MP4 or HLS/DASH for production; keep a low-res preview for inline previews where possible.

After adding your assets, run `npm run dev` and verify the Work > Preview and Watch buttons load the correct files.

## Deployment & Production Notes

- Recommended hosts: Vercel or Netlify for instant deploys and global CDN. Connect the `site` folder as the project root when deploying.
- Ensure large video assets are hosted on a video-friendly CDN (Cloudflare, AWS S3 + CloudFront, or a dedicated video host). Linking large MP4s from the app is fine for demo, but production should use a CDN and adaptive formats (HLS/DASH) for best performance.
- Tailwind purge is configured via `tailwind.config.cjs` — the production build already strips unused utilities when you run `npm run build`.

## Contact form

- The included contact form in `src/components/Contact.jsx` posts to Formspree by default. Replace the placeholder `https://formspree.io/f/your-form-id` with your Formspree form ID or point it to your server endpoint.
- Alternatively use Netlify Forms by adding a `name="contact"` attribute to the form and letting Netlify detect it on deploy.

## Production checklist

- Transcode videos to modern codecs (H.264, H.265/AV1 where supported) and generate optimized poster images.
- Host videos on CDN and update `assets` paths in the app to point to the CDN for production builds.
- Verify `site/dist` after `npm run build` and deploy the `dist` output directory if your host requires static assets.


