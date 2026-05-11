"use client";

import dynamic from "next/dynamic";

const EmailPopup   = dynamic(() => import("@/components/EmailPopup"),   { ssr: false });
const PopupBanner  = dynamic(() => import("@/components/PopupBanner"),  { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

export default function ClientPopups() {
  return (
    <>
      <EmailPopup />
      <PopupBanner />
      <CookieBanner />
    </>
  );
}
