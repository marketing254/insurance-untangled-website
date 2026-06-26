/**
 * Client-side Kit (ConvertKit) submission helper.
 *
 * Fires a `fetch` from the user's browser straight to Kit's public form
 * subscription endpoint — same path Kit's own embed code uses. The browser
 * naturally sends `Origin` and `Referer` headers, which Kit's anti-spam
 * machinery treats as a legitimate signup (unlike server-to-server POSTs
 * from Apps Script, which can land in a suppressed state).
 *
 * This runs in parallel to the existing Apps Script POST that writes to
 * the Google Sheet — it is purely additive and never blocks the main flow.
 *
 * Form IDs and field schemas were extracted directly from each Kit form's
 * published JavaScript bundle on skilled-originator-8937.kit.com. They are
 * public values — safe to ship in the JS bundle.
 */

type KitFormType =
  | "newsletter"
  | "newsletter_blog"
  | "podcast_gate"
  | "email_popup"
  | "contact"
  | "guest"
  | "resource_request";

interface KitFormConfig {
  id: number;
  // map[kitFieldName] = paramKey in the submission object
  fields: Record<string, string>;
  // names that should be reduced to a first name (strip "Dr." + last names)
  firstNameOnly?: string[];
}

const KIT_FORMS: Record<KitFormType, KitFormConfig> = {
  newsletter: {
    id: 9576689,
    fields: { full_name: "name", source: "source" },
  },
  newsletter_blog: {
    id: 9576689,
    fields: { full_name: "name", source: "source" },
  },
  podcast_gate: {
    id: 9576680,
    fields: { full_name: "name" },
  },
  email_popup: {
    id: 9576641,
    fields: { first_name: "name" },
    firstNameOnly: ["first_name"],
  },
  contact: {
    id: 9576655,
    fields: { full_name: "name", message: "message", practice: "practice" },
  },
  guest: {
    id: 9576664,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      firm_name: "firm",
      title: "title",
      phone: "phone",
      applyas: "applyAs",
      topic: "topic",
      bio: "bio",
    },
  },
  resource_request: {
    id: 9576615,
    fields: {
      full_name: "name",
      resource_id: "resource_id",
      resource_title: "resource_title",
      resource_type: "resource_type",
    },
  },
};

function pickFirstName(raw: string): string {
  const parts = raw.trim().split(/\s+/);
  if (parts.length === 0) return "";
  const startIdx = /^dr\.?$/i.test(parts[0]) && parts.length > 1 ? 1 : 0;
  return parts[startIdx] || "";
}

/**
 * Submit a lead to the matching Kit form. Fire-and-forget — never throws,
 * never blocks. Safe to call after the existing Apps Script submission.
 */
export async function postToKit(
  formType: KitFormType,
  params: Record<string, string | undefined | null>
): Promise<void> {
  const form = KIT_FORMS[formType];
  if (!form) return;

  const email = (params.email || "").trim();
  if (!email || !email.includes("@")) return;

  const body = new URLSearchParams();
  body.set("email_address", email);
  body.set("fields[timestamp]", new Date().toISOString());

  Object.entries(form.fields).forEach(([kitField, paramKey]) => {
    let value = (params[paramKey] || "").toString().trim();
    if (!value) return;
    if (form.firstNameOnly?.includes(kitField)) {
      value = pickFirstName(value);
      if (!value) return;
    }
    body.set(`fields[${kitField}]`, value);
  });

  try {
    await fetch(`https://app.kit.com/forms/${form.id}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // Browser supplies Origin + Referer automatically — this is the difference
      // vs. Apps Script's UrlFetchApp that makes Kit accept the lead cleanly.
    });
  } catch {
    /* fire-and-forget — never block the sheet write */
  }
}
