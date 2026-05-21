import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Contact Insurance Untangled — Dental PPO & Marketing Questions" },
  description:
    "Have a question about dental insurance strategy, the podcast, or our services? Send us a message and we'll get back to you within 1 business day.",
  alternates: { canonical: "https://www.insuranceuntangled.com/contact/" },
};

export default function Contact() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Contact Us</div>
          <h1 className="page-title">We&rsquo;d love to hear from you.</h1>
          <p className="page-sub contact-sub-desktop">Have a question about dental insurance strategy, the podcast, or our services? Send us a message and we&rsquo;ll get back to you within 1 business day.</p>
          {/* MOBILE QUICK-BOOK CARD */}
          <div className="contact-quick-book">
            <div className="cqb-card">
              <div className="cqb-label">Most popular</div>
              <div className="cqb-title">Book a Free Strategy Call</div>
              <div className="cqb-sub">15 min &bull; No obligation &bull; We&rsquo;ll review your practice first</div>
              <Link href="/msm/" className="cqb-btn">Book Now &rarr;</Link>
            </div>
            <div className="cqb-alt">
              <a href="https://wa.me/13157435373" target="_blank" rel="noopener noreferrer" className="cqb-alt-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M11.997 0C5.373 0 0 5.373 0 12c0 2.127.558 4.107 1.532 5.825L0 24l6.335-1.512C8.012 23.447 9.965 24 12.003 24 18.627 24 24 18.627 24 12S18.627 0 11.997 0zm.006 21.818c-1.815 0-3.548-.487-5.057-1.334l-.363-.215-3.763.987.984-3.67-.237-.378a9.823 9.823 0 0 1-1.518-5.218c0-5.432 4.42-9.852 9.854-9.852 2.632 0 5.104 1.027 6.963 2.888a9.819 9.819 0 0 1 2.88 6.96c-.003 5.432-4.423 9.832-9.843 9.832z" /></svg>
                WhatsApp us
              </a>
              <a href="tel:+13157435373" className="cqb-alt-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="contact-grid">
            <ContactForm />
            <div>
              <div className="sec-eyebrow">Get in touch</div>
              <h2 className="sec-title" style={{ fontSize: "1.75rem" }}>Our team is here to help.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-3)", lineHeight: 1.7, marginBottom: "2.5rem" }}>Whether you have a question about our podcast, want to discuss PPO negotiation, or are looking to grow your practice through smarter marketing &mdash; reach out.</p>
              <div className="contact-info">
                <div className="ci-item"><div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div><div><div className="ci-label">Phone</div><div className="ci-value"><a href="tel:+13157435373">+1 (315) 743-5373</a></div></div></div>
                <div className="ci-item"><div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div><div><div className="ci-label">Email</div><div className="ci-value"><a href="mailto:support@insuranceuntangled.com">support@insuranceuntangled.com</a></div></div></div>
                <div className="ci-item"><div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div><div><div className="ci-label">Address</div><div className="ci-value">303 Pinetree Way, Mississauga,<br />Ontario L5G 2R4, Canada</div></div></div>
                <div className="ci-item"><div className="ci-icon" style={{ color: "#25D366" }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M11.997 0C5.373 0 0 5.373 0 12c0 2.127.558 4.107 1.532 5.825L0 24l6.335-1.512C8.012 23.447 9.965 24 12.003 24 18.627 24 24 18.627 24 12S18.627 0 11.997 0zm.006 21.818c-1.815 0-3.548-.487-5.057-1.334l-.363-.215-3.763.987.984-3.67-.237-.378a9.823 9.823 0 0 1-1.518-5.218c0-5.432 4.42-9.852 9.854-9.852 2.632 0 5.104 1.027 6.963 2.888a9.819 9.819 0 0 1 2.88 6.96c-.003 5.432-4.423 9.832-9.843 9.832z" /></svg></div><div><div className="ci-label">WhatsApp</div><div className="ci-value"><a href="https://wa.me/13157435373" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)" }}>Message us on WhatsApp</a></div></div></div>
                <div className="ci-item"><div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div><div><div className="ci-label">Response time</div><div className="ci-value">We typically respond within 1 business day</div></div></div>
              </div>
              <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "var(--sky-pale)", border: "1px solid var(--sky)", borderRadius: "8px" }}>
                <div className="sec-eyebrow" style={{ marginBottom: ".5rem" }}>Free consultation</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: ".5rem" }}>Prefer to talk strategy?</div>
                <p style={{ fontSize: "13px", color: "var(--ink-3)", marginBottom: "1rem" }}>Book a free marketing strategy meeting with Lila from Ekwa and get a personalized growth plan for your practice.</p>
                <Link href="/msm/" className="btn-primary">Book Free Strategy Meeting &rarr;</Link>
              </div>
            </div>
          </div>
          {/* Google Maps - full width below the grid */}
          <div style={{ marginTop: "3rem", borderRadius: "var(--r-lg)", overflow: "hidden", height: "300px", border: "1px solid var(--paper-3)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.1!2d-79.6!3d43.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47a2d2c3!2s303+Pinetree+Way%2C+Mississauga%2C+ON!5e0!3m2!1sen!2sca!4v1"
              width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Ekwa Marketing office location">
            </iframe>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-eyebrow" style={{ color: "rgba(168,196,228,.7)" }}>Ready to untangle your insurance?</div>
          <h2 className="sec-title" style={{ color: "#fff", marginBottom: "1rem" }}>Take the free PPO Readiness Scorecard.</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,.5)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}>10 questions. A personalised score across 6 dimensions. A free report in your inbox. Takes 2 minutes.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/ppo-scorecard/" className="btn-primary" style={{ fontSize: "15px", padding: ".9rem 2rem" }}>Take the Free Scorecard &rarr;</Link>
            <Link href="/contact/" className="btn-outline-light" style={{ fontSize: "15px", padding: ".9rem 2rem" }}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
