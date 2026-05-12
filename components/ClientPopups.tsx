"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const EmailPopup   = dynamic(() => import("@/components/EmailPopup"),   { ssr: false });
const PopupBanner  = dynamic(() => import("@/components/PopupBanner"),  { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

// Pages where promo popups (EmailPopup + PopupBanner) should NOT appear.
// The booking flow on /dental-marketing/ + the gated scorecard already have
// their own conversion goals — extra popups would compete and distract.
// CookieBanner ALWAYS shows (GDPR requirement).
const POPUP_BLOCKED_PATHS = [
  "/dental-marketing",
  "/ppo-scorecard",
  "/thank-you",
  "/data-request",
];

export default function ClientPopups() {
  const pathname = usePathname() || "";
  const popupsAllowed = !POPUP_BLOCKED_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      {popupsAllowed && <EmailPopup />}
      {popupsAllowed && <PopupBanner />}
      {/* CookieBanner always renders — required for GDPR / CCPA compliance */}
      <CookieBanner />
    </>
  );
}
