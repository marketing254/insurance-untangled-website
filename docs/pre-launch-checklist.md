# Pre-Launch Checklist & Post-Launch Monitoring

A go-live checklist for `insuranceuntangled.com`. Walk through every item before pushing to production DNS.

---

## 🚀 Pre-Launch (T-7 days)

### Domain & DNS
- [ ] `insuranceuntangled.com` DNS pointed at GitHub Pages or chosen CDN
- [ ] `www` subdomain redirects to root (or vice versa — pick one canonical)
- [ ] HTTPS certificate issued and auto-renewing
- [ ] SPF record published (`docs/dns-email-setup.md`)
- [ ] DKIM record published
- [ ] DMARC record published at `p=quarantine`
- [ ] All Apps Script email tests show `SPF: PASS / DKIM: PASS / DMARC: PASS`

### Analytics
- [ ] `NEXT_PUBLIC_GA4_ID` set in `.env.local` (e.g. `G-XXXXXXXXXX`)
- [ ] OR `NEXT_PUBLIC_GTM_ID` set if using GTM
- [ ] GA4 stream verified — fire a test event and confirm it appears in GA4 Realtime
- [ ] Google Search Console verified (TXT record at root or HTML file in `/public/`)
- [ ] Bing Webmaster Tools verified
- [ ] Sitemap submitted to both: `https://www.insuranceuntangled.com/sitemap.xml`

### Content & UX
- [ ] All 137+ podcast episodes have `date_iso` and `duration` in the Google Sheet
- [ ] At least 3 blog posts published (currently 1) — fills the related-posts grid
- [ ] All `EXAMPLE` rows removed from the Sheet
- [ ] Privacy Policy, Cookie Policy, Terms of Service all link from footer
- [ ] Data deletion request page accessible from footer
- [ ] FAQ page reviewed and answers checked for accuracy
- [ ] Case Studies page numbers verified with the relevant teams
- [ ] Hero stat numbers ("$3B+", "20yr", "137+") match current reality
- [ ] All Kit form references removed (only Apps Script in use)

### Forms — End-to-end test each one
- [ ] Newsletter form (homepage) → `Newsletter` tab in Sheet
- [ ] Newsletter form (blog post) → `Newsletter Blog` tab
- [ ] EmailPopup → `Email Popup` tab
- [ ] Contact form (`/contact/`) → `Contact` tab
- [ ] Guest application (`/be-a-guest/`) → `Guest Applications` tab
- [ ] Podcast card gate → `Podcast Access` tab, episode page accessible after
- [ ] Webinar card gate → `Webinar Access` tab, replay page accessible after
- [ ] Data deletion request (`/data-request/`) → `Data Deletion Requests` tab
- [ ] Notification email arrives at `support@insuranceuntangled.com` for each
- [ ] Honeypot rejects bot submissions (test by JS-filling `hp_field` in console)

### Route Protection
- [ ] Visit `/podcast/137-some-slug/` directly in incognito → redirects to `/podcast/`
- [ ] Visit `/events/replay/some-slug/` directly in incognito → redirects to `/events/`
- [ ] Complete the gate form on a card → episode/replay page now loads

### Performance
- [ ] Lighthouse score ≥ 90 for Performance on homepage
- [ ] Lighthouse score = 100 for Accessibility
- [ ] Lighthouse score = 100 for Best Practices
- [ ] Lighthouse score = 100 for SEO
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms (test with PageSpeed Insights)
- [ ] Hero image is preloaded (check Network tab)
- [ ] Total page weight on homepage < 1.5MB

### SEO
- [ ] All pages have unique titles and meta descriptions
- [ ] All pages have canonical tags
- [ ] OG image renders correctly when sharing to Facebook/LinkedIn (test with [opengraph.xyz](https://opengraph.xyz))
- [ ] Twitter card renders correctly (test with [cards-dev.twitter.com](https://cards-dev.twitter.com/validator))
- [ ] Schema validates: paste each page URL into [validator.schema.org](https://validator.schema.org)
- [ ] No broken internal links (run `npx linkinator https://www.insuranceuntangled.com` after build)
- [ ] robots.txt allows `Sitemap:` line is reachable
- [ ] `llms.txt` is up to date with all major pages

### Security
- [ ] CSP meta tag present in production HTML (view source on any page)
- [ ] `X-Frame-Options`, `X-Content-Type-Options` headers present
- [ ] Honeypot field on every form submitted to Apps Script
- [ ] `.env.local` is in `.gitignore` (already is)
- [ ] No secrets, API keys, or `console.log()` debug statements in production bundle
- [ ] Test that direct `https://script.google.com/...exec` URL is not exposed in HTML beyond what's necessary

### Cross-browser & Device
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Tested on a real iPhone and a real Android phone

### Accessibility
- [ ] Tab through homepage with keyboard — every interactive element reachable
- [ ] Skip-link appears on first Tab press
- [ ] Screen reader test (VoiceOver on Mac / NVDA on Windows) — landmarks announce correctly
- [ ] Contrast check: all text passes WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Form errors announced to screen readers via `aria-live` (where applicable)

### Legal & Compliance
- [ ] Privacy Policy reviewed by legal (or templated from a trusted source)
- [ ] Terms of Service reviewed by legal
- [ ] Cookie banner appears on first visit
- [ ] Cookie consent persisted in localStorage
- [ ] Data deletion request flow tested end-to-end
- [ ] Apps Script `deleteUserData(email)` function tested manually

### Backup & Recovery
- [ ] `BACKUP_FOLDER_ID` set in `data/iu-form-handler.gs`
- [ ] Daily Apps Script trigger configured (Triggers icon in editor → `backupSpreadsheet` → time-driven → daily, 3am)
- [ ] First backup confirmed in the backup folder after the trigger runs once
- [ ] Backup retention policy (`BACKUP_RETENTION_COUNT = 30`) verified

---

## 📡 Uptime Monitoring (free options)

Pick one and set up before launch. All offer free tiers for a single domain.

### UptimeRobot (recommended — simplest)
1. Sign up at [uptimerobot.com](https://uptimerobot.com) — free for 50 monitors, 5-min intervals
2. Add new HTTP(s) monitor:
   - **URL:** `https://www.insuranceuntangled.com`
   - **Interval:** 5 minutes
3. Add an Alert Contact: your email
4. Optionally add a status page: `status.insuranceuntangled.com`

### Better Stack (formerly BetterUptime)
- More polished UI, free for 10 monitors at 3-min intervals
- [betterstack.com/better-uptime](https://betterstack.com/better-uptime)

### Pingdom / StatusCake
- More enterprise-tier options. Free tiers exist but more limited.

### What to monitor
- `https://www.insuranceuntangled.com/` — homepage
- `https://www.insuranceuntangled.com/podcast/` — most-trafficked page
- `https://www.insuranceuntangled.com/sitemap.xml` — confirms build hasn't broken sitemap generation
- `https://script.google.com/macros/s/.../exec` — confirms Apps Script is responding (test endpoint)

---

## 🔥 Launch Day (T-0)

- [ ] Final `git pull` and full `npm run build` succeeds with zero errors
- [ ] Deploy to GitHub Pages (or chosen host)
- [ ] DNS cutover happens (if changing hosts) — typical propagation 1–4 hours
- [ ] Within 1 hour: refresh in fresh incognito → verify homepage loads
- [ ] Within 1 hour: visit GA4 Realtime → confirm your visit registers
- [ ] Within 1 hour: submit homepage in Google Search Console → request indexing
- [ ] Post launch announcement (newsletter, LinkedIn, podcast intro)
- [ ] Monitor UptimeRobot dashboard for first 24 hours
- [ ] Check error logs / browser console on a few pages

---

## 📊 Post-Launch (T+1 to T+30 days)

### Day 1
- [ ] Check GA4 — pages loading, events firing, no spikes in errors
- [ ] Submit URLs to Google Search Console "Inspect URL" for fast indexing
- [ ] Test all forms once in production
- [ ] Verify daily backup ran (check backup folder in Drive)

### Week 1
- [ ] Review GA4 traffic patterns — any 404s? Any pages with 0 sessions?
- [ ] Check Search Console for crawl errors
- [ ] Review form submissions in Sheets — quality OK, no spam getting through honeypot?
- [ ] Run Lighthouse on top 5 pages again to confirm scores held

### Week 2-4
- [ ] DMARC reports start arriving at `dmarc-reports@...` — review for spoofing attempts
- [ ] If no DMARC failures from legitimate sources, upgrade `p=quarantine` → `p=reject`
- [ ] Google Search Console: which queries are bringing traffic? Any unexpected pages indexed?
- [ ] Set up monthly review: KPI dashboard (sessions, conversions, top pages, top queries)

### Day 30
- [ ] Full re-audit using `claude /seo-audit`
- [ ] Verify all backups are landing
- [ ] Check for any new podcast episodes/webinars that need sheet updates
- [ ] Review honeypot catch rate (any actual bots being filtered?)

---

## 🆘 Emergency Runbook

### Site is down
1. Check UptimeRobot dashboard — is it definitely down or a false alarm?
2. Check GitHub Pages status: [www.githubstatus.com](https://www.githubstatus.com)
3. Check DNS: `dig www.insuranceuntangled.com` from terminal — does it return the right IP?
4. If DNS is wrong: log in to registrar and verify the A/CNAME records
5. If DNS is right but page is broken: check last GitHub commit. Revert if needed.

### Forms aren't submitting
1. Open browser console on the form page — any CSP or network errors?
2. Open the Apps Script editor → **Executions** tab — are submissions reaching the script?
3. If executions show errors: check the relevant function (`handleForm` etc.) for exceptions
4. Verify the Apps Script `/exec` URL in components matches the current deployed URL
5. Verify the Sheet ID in the Apps Script matches your actual sheet

### Data loss
1. Don't panic — daily backups are in the configured `BACKUP_FOLDER_ID`
2. Open the most recent backup file
3. Restore the relevant tab(s) by copying back into the live sheet

### Compromised credentials
1. Rotate the Apps Script deployment immediately:
   - Apps Script editor → **Deploy** → **Manage deployments** → **Edit** → **New version** → **Deploy**
   - This generates a new `/exec` URL
   - Update the URL in all 7 component files (search for the old `AKfycb...` string)
   - Build + deploy
2. Revoke any related OAuth grants in Google Account Security
3. Audit Sheet revision history for unexpected changes

---

## ✅ Sign-off

Before announcing publicly:

- [ ] Owner sign-off: _______________________  Date: ________
- [ ] Technical sign-off: ___________________  Date: ________
- [ ] Legal sign-off: _______________________  Date: ________
