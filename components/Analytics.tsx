import Script from "next/script";

// Env vars (NEXT_PUBLIC_ → inlined at build time):
//   NEXT_PUBLIC_GA4_ID      e.g. "G-XXXXXXXXXX"
//   NEXT_PUBLIC_GTM_ID      e.g. "GTM-XXXXXXX"  (optional; GA4 alone is enough for most cases)
//
// Set them in .env.local. If absent, analytics is silently disabled — safe for development.

export default function Analytics() {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  // Skip entirely in dev unless explicitly enabled (avoids polluting GA with dev hits)
  if (process.env.NODE_ENV !== "production") return null;
  if (!GA4_ID && !GTM_ID) return null;

  return (
    <>
      {GTM_ID && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        </>
      )}
      {GA4_ID && (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{anonymize_ip:true,send_page_view:true});`,
            }}
          />
        </>
      )}
    </>
  );
}

// GTM noscript fallback — render in <body> via layout.tsx
export function GTMNoScript() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  if (process.env.NODE_ENV !== "production" || !GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
