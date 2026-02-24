# Music Peer Exchange Sessions (Astro + Decap CMS + Netlify)

A beginner-friendly bilingual website for student-led knowledge exchange.

- English route: `/en`
- Chinese route: `/cn`
- Browser-based content editing: `/admin`
- No custom backend required.

---

## Local development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

---

## One-time setup (foolproof)

### 1) Create a GitHub repo and push this project
1. Create an empty GitHub repository.
2. Upload all files from this project.
3. Confirm files exist on GitHub.

### 2) Deploy to Netlify (free)
1. Log in to Netlify.
2. Click **Add new site** → **Import an existing project**.
3. Choose GitHub and select your repo.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

### 3) Enable CMS login (Netlify Identity + Git Gateway)
1. In Netlify site dashboard, go to **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, keep it invite-only (recommended).
4. Go to **Identity → Services**.
5. Enable **Git Gateway**.

### 4) Create your CMS user
1. In **Identity** tab, click **Invite users**.
2. Enter your own email.
3. Open invite email and set password.

### 5) Open CMS
1. Visit: `https://your-site.netlify.app/admin`
2. Log in.
3. You can now edit content in browser.

---

## Edit content without code

1. Go to `/admin`.
2. Use:
   - **Settings (EN)** to edit English home content.
   - **Settings (CN)** to edit Chinese home content.
   - **Sessions (EN/CN)** to add/edit/delete sessions.
3. Save and publish changes.
4. Netlify will auto-redeploy.

---

## Replace photos

1. In CMS editor, use image fields or Media Library upload.
2. Upload new image(s).
3. Set `hero_image` and `gallery_images` in settings collections.
4. Publish.

Image paths are saved under `public/uploads` automatically.

---

## Set registration link + close registration

For each session entry in CMS:
- Paste Google Form link into `registration_url`.
- Set `registration_status`:
  - `Open` → register button enabled.
  - `Closed` → badge shows Closed and register button is disabled.

Optional operational step: in Google Form, turn off **Accepting responses** when full.

---

## Language toggle behavior

- Navbar toggle always shows: `English | 中文`
- English and Chinese content are managed **separately**.
- Update both languages in CMS if you need matching information.

---

## Common troubleshooting

### `/admin` login fails
- Check **Netlify Identity** is enabled.
- Check **Git Gateway** is enabled.
- Confirm you accepted invite and set password.

### Images not showing
- Confirm image is uploaded in CMS.
- Confirm image path points to `/uploads/...` or `/images/...`.

### Content changed but page not updated yet
- Wait for Netlify deploy to finish.
- Hard refresh browser.

---

## Content model locations

- Settings EN: `src/content/settings/en.yml`
- Settings CN: `src/content/settings/cn.yml`
- Sessions EN: `src/content/sessions/en/*.md`
- Sessions CN: `src/content/sessions/cn/*.md`

These are managed through Decap CMS by non-technical users.

---

## Email reminders (optional, no website backend)

Use the helper script in:
- `tools/google-sheets-mailer/Mailer.gs`
- `tools/google-sheets-mailer/MAILER_README.md`

This lets you send reminder/closed emails from Google Sheets via Apps Script.
