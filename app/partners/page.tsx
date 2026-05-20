import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Dental Industry Partner Directory | Insurance Untangled" },
  description:
    "The Insurance Untangled partner network brings together vetted dental industry professionals who share our belief that dentists deserve to navigate insurance with confidence.",
  alternates: { canonical: "https://www.insuranceuntangled.com/partners/" },
};

export default function Partners() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Partners</div>
          <h1 className="page-title">Trusted experts in your corner.</h1>
          <p className="page-sub">The Insurance Untangled partner network brings together vetted dental industry professionals who share our belief that dentists deserve to understand and navigate insurance with confidence.</p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">Our partners</div>
          <h2 className="sec-title">Meet the network.</h2>
          <p className="sec-sub">Each partner is handpicked for their expertise and alignment with our mission.</p>
          <div className="partners-grid reveal">
            <a href="https://www.insuranceuntangled.com/partner-directory/rebecca-herring/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d1" role="button" tabIndex={0}><div className="partner-avatar">R</div><div className="partner-name">Rebecca Herring</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/tessina-bullock/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d2" role="button" tabIndex={0}><div className="partner-avatar">T</div><div className="partner-name">Tessina Bullock</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/lisa-copeland/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d3" role="button" tabIndex={0}><div className="partner-avatar">L</div><div className="partner-name">Lisa Copeland</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/laura-johnston/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d4" role="button" tabIndex={0}><div className="partner-avatar">L</div><div className="partner-name">Laura Johnston</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/michael-sonick/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d5" role="button" tabIndex={0}><div className="partner-avatar">M</div><div className="partner-name">Michael Sonick</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/jordon-comstock/" target="_blank" rel="noopener noreferrer" className="partner-card reveal-d6" role="button" tabIndex={0}><div className="partner-avatar">J</div><div className="partner-name">Jordon Comstock</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/bob-spiel/" target="_blank" rel="noopener noreferrer" className="partner-card" role="button" tabIndex={0}><div className="partner-avatar">B</div><div className="partner-name">Bob Spiel</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/morgan-millet/" target="_blank" rel="noopener noreferrer" className="partner-card" role="button" tabIndex={0}><div className="partner-avatar">M</div><div className="partner-name">Morgan Millet</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
            <a href="https://www.insuranceuntangled.com/partner-directory/ericka-aguilar/" target="_blank" rel="noopener noreferrer" className="partner-card" role="button" tabIndex={0}><div className="partner-avatar">E</div><div className="partner-name">Ericka Aguilar</div><div className="partner-link-lbl">View profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div></a>
          </div>
        </div>
      </section>

      <div className="partner-cta-band">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="partner-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg></div>
          <div className="sec-eyebrow reveal">Join us</div>
          <h2 className="sec-title">Want to be a partner?</h2>
          <p style={{ fontSize: "16px", color: "var(--ink-3)", lineHeight: 1.7, margin: ".75rem 0 0" }}>If you&apos;re a dental industry professional who helps practices navigate the insurance system, grow their patient base, or run a stronger business &mdash; we&apos;d love to talk.</p>
          <div className="perks-row">
            <div className="perk-item"><span className="perk-dot"></span>Featured profile in the directory</div>
            <div className="perk-item"><span className="perk-dot"></span>Podcast guest opportunities</div>
            <div className="perk-item"><span className="perk-dot"></span>Access to our dental audience</div>
          </div>
          <a href="#speaker-form-wrap" className="btn-primary btn-primary-lg">Apply to Become a Partner &rarr;</a>
        </div>
      </div>

      <section style={{ background: "var(--paper)", borderTop: "1px solid var(--paper-3)", padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", maxWidth: "900px", margin: "0 auto" }}>
            <div>
              <div className="sec-eyebrow">Apply now</div>
              <h2 className="sec-title">Want to be a guest or speaker?</h2>
              <p style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: 1.7, marginTop: ".75rem", marginBottom: "1.5rem" }}>We&rsquo;re always looking for dental insurance experts, practice owners, and industry leaders for the podcast, live panels, and webinars. Tell us about yourself below.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: "13.5px", color: "var(--ink-3)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Podcast guest appearances</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: "13.5px", color: "var(--ink-3)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Live CE webinar panelist</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: "13.5px", color: "var(--ink-3)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Summit keynote or panel</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: "13.5px", color: "var(--ink-3)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Dental industry experts welcome</div>
              </div>
            </div>
            <div>
              <div id="speaker-form-wrap" style={{ background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "14px", padding: "1.75rem", boxShadow: "0 4px 20px rgba(11,37,69,.94)" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>Tell us about yourself</div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".55rem", marginBottom: ".75rem" }}>
                  <input id="sp-name" type="text" placeholder="Your full name" className="bk-input" style={{ background: "var(--paper-2)" }} />
                  <input id="sp-email" type="email" placeholder="your@email.com" className="bk-input" style={{ background: "var(--paper-2)" }} />
                  <input id="sp-title" type="text" placeholder="Your title / role" className="bk-input" style={{ background: "var(--paper-2)" }} />
                  <input id="sp-topic" type="text" placeholder="Topic you'd like to speak about" className="bk-input" style={{ background: "var(--paper-2)" }} />
                  <select id="sp-type" className="bk-input" style={{ background: "var(--paper-2)", color: "var(--ink-3)", cursor: "pointer" }}>
                    <option value="">Preferred format...</option>
                    <option>Podcast guest</option>
                    <option>Webinar panelist</option>
                    <option>Summit / live event</option>
                    <option>Any format</option>
                  </select>
                </div>
                <button style={{ width: "100%", background: "var(--navy)", color: "#fff", border: "none", borderRadius: "8px", padding: ".85rem", fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "background .18s" }}>Submit Application &rarr;</button>
                <div style={{ textAlign: "center", fontSize: "11.5px", color: "var(--ink-4)", marginTop: ".6rem" }}>We review every application and respond within 5 business days.</div>
              </div>
              <div id="speaker-success" style={{ display: "none", textAlign: "center", padding: "2rem", background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "14px" }}>
                <div style={{ width: "52px", height: "52px", background: "#d4f5ea", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto .9rem" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e9e6b" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: ".4rem" }}>Application received!</div>
                <p style={{ fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.65 }}>Thanks for your interest. Our team will review your application and get back to you within 5 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
