# DNS & Email Authentication Setup

Required to ensure form-notification emails from the Apps Script land in inboxes (not spam) and to prevent domain spoofing.

This is a **one-time setup** at your domain registrar (Namecheap, GoDaddy, Cloudflare DNS, etc.) — not something Claude can do automatically.

---

## 1. SPF (Sender Policy Framework)

Authorises Google to send mail on behalf of `insuranceuntangled.com`. Without this, Gmail and Outlook will flag your Apps Script notifications as spam or "unverified sender".

**Add this TXT record at the root of `insuranceuntangled.com`:**

| Field | Value |
|---|---|
| Type | `TXT` |
| Host / Name | `@`  (or leave blank — means the root domain) |
| Value | `v=spf1 include:_spf.google.com ~all` |
| TTL | `3600` (1 hour) |

> If you already have an SPF record, do not add a second one. Merge them into one record — multiple SPF records on a single domain is invalid.

---

## 2. DKIM (DomainKeys Identified Mail)

Adds a cryptographic signature so Gmail can verify the email actually came from your Google Workspace. This requires Google Workspace (the paid Gmail with custom domain) — not regular Gmail.

**If you have Google Workspace:**

1. Sign in to [admin.google.com](https://admin.google.com)
2. Apps → **Google Workspace** → **Gmail** → **Authenticate email**
3. Select `insuranceuntangled.com`
4. Click **Generate new record** → choose **2048-bit** key
5. Google shows you a TXT record like:
   ```
   Host: google._domainkey
   Value: v=DKIM1; k=rsa; p=MIIBIj...  (long string)
   ```
6. Copy and paste both fields into your DNS provider as a new TXT record
7. Wait 24 hours for DNS propagation
8. Go back to Google Admin → **Start authentication**

**If you do NOT have Google Workspace:**
You're using the free Apps Script `MailApp.sendEmail()`, which sends from a `*@gmail.com` address by default. DKIM cannot be configured on `@gmail.com` — only on your custom domain via Workspace. You can either:
- **Option A** — Get Google Workspace (~$6/user/month) and configure DKIM
- **Option B** — Set up Mailgun, SendGrid, or Resend (free tier available) and rewrite the Apps Script's `MailApp.sendEmail` to call their API instead. Each provider gives you DKIM/SPF instructions.

---

## 3. DMARC (Domain-based Message Authentication, Reporting & Conformance)

Tells receiving mail servers what to do with email that fails SPF or DKIM, and gives you reports on spoofing attempts.

**Add this TXT record after SPF + DKIM are working:**

| Field | Value |
|---|---|
| Type | `TXT` |
| Host / Name | `_dmarc` |
| Value | `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@insuranceuntangled.com; pct=100; adkim=s; aspf=s` |
| TTL | `3600` |

### What each piece means

- `p=quarantine` — fraudulent mail goes to spam (start here; upgrade to `p=reject` after 30 days of reports show no legitimate failures)
- `rua=mailto:dmarc-reports@...` — weekly aggregate reports are emailed here (create this address or alias it to support@)
- `pct=100` — apply the policy to 100% of failing mail
- `adkim=s` / `aspf=s` — strict alignment (subdomains must also pass — most secure)

---

## 4. Verification

After publishing all three records, wait 24 hours then check:

- **SPF / DKIM / DMARC together:** [mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx) → enter `insuranceuntangled.com`
- **Send a test:** Mail an email from your Apps Script-connected Google account to a Gmail address. Open the message, click **⋮** → **Show original**. You should see:
  ```
  SPF:    PASS
  DKIM:   PASS
  DMARC:  PASS
  ```

If anything shows `FAIL` or `NEUTRAL`, recheck the DNS record values for typos.

---

## 5. Optional but recommended

### BIMI (Brand Indicators for Message Identification)
After DMARC is at `p=quarantine` or `p=reject` and verified, BIMI lets Gmail show your logo next to emails. Requires a Verified Mark Certificate (~$1500/year, often not worth it for early-stage brands).

### MTA-STS
Forces mail servers to use TLS when sending to you. Add a `_mta-sts.insuranceuntangled.com` TXT record + an `https://mta-sts.insuranceuntangled.com/.well-known/mta-sts.txt` policy file. Defers spoofing further.

---

## Current status: ❌ NOT CONFIGURED

These records do not exist on `insuranceuntangled.com` as of 2026-05-08. Without them:
- Form notification emails from the Apps Script will frequently land in spam
- Bad actors can send phishing email pretending to be from `support@insuranceuntangled.com` with no way to detect or block it
- Email deliverability score (Postmark, Mailgun, etc.) will be flagged as risky

**Priority:** High — should be configured before public launch.
