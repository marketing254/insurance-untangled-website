import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <Link href="/">
                <img src="/images/logo.png" alt="Insurance Untangled" />
              </Link>
            </div>
            <div className="footer-tag">Untangling dental insurance since 2023</div>
            <p className="footer-desc">
              Helping dentists understand, negotiate, and navigate the insurance system with confidence &mdash; through
              the podcast, live events, and expert resources.
            </p>
            <div className="footer-contact">
              <a href="tel:+13157435373">+1 (315) 743-5373</a>
              <a href="mailto:support@insuranceuntangled.com">support@insuranceuntangled.com</a>
            </div>
          </div>
          <div>
            <div className="fc-title">Content</div>
            <ul className="fc-links">
              <li><Link href="/podcast/">Podcast Episodes</Link></li>
              <li><Link href="/events/">Webinar Replays</Link></li>
              <li><Link href="/partners/">Partners</Link></li>
              <li><Link href="/events/">Live Events</Link></li>
              <li><Link href="/ppo-scorecard/" style={{ color: "#0EA5A0" }}>PPO Readiness Scorecard</Link></li>
            </ul>
          </div>
          <div>
            <div className="fc-title">Services</div>
            <ul className="fc-links">
              <li><Link href="/ppo-negotiation/">PPO Negotiation</Link></li>
              <li><Link href="/msm/">Dental Marketing</Link></li>
              <li><Link href="/contact/">Free Consultation</Link></li>
            </ul>
          </div>
          <div>
            <div className="fc-title">Company</div>
            <ul className="fc-links">
              <li><Link href="/about/">About Us</Link></li>
              <li><Link href="/about/">Meet the Founders</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><a href="https://www.ekwa.com/" target="_blank" rel="noopener noreferrer">Ekwa Marketing</a></li>
              <li><Link href="/ppo-negotiation/">Veritas Dental</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-socials">
          <a href="https://www.youtube.com/channel/UCliwnaJxX5y_Nt3YfVKVyRA" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-1.9-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.2 3 12 3 12 3s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5.1 1 7 1 7S.7 9 .7 11v1.9C.7 15 1 16.9 1 16.9S1.3 18.8 2.2 19.6c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21 12 21 12 21s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2 .3-4v-1.9C23.3 9 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>
          </a>
          <a href="https://web.facebook.com/profile.php?id=100089752774006" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.1 10.1 24v-8.4H7.1v-3.5h3V9.7c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z"/></svg>
          </a>
          <a href="https://www.instagram.com/insuranceuntangledpodcast/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.3 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7C24 15.7 24 15.3 24 12s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/insurance-untangled-podcast" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.5v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@insuranceuntangled" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="TikTok">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 4.8a5.8 5.8 0 0 1-5.7-5.8h-4v15.3a2.8 2.8 0 1 1-2-2.7V7.6a6.7 6.7 0 1 0 5.9 6.7V9.9a9.7 9.7 0 0 0 5.7 1.8V7.8a5.8 5.8 0 0 1-3.9-1.5V4.8h4z"/></svg>
          </a>
          <a href="https://twitter.com/InsuranceU40869" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X / Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2h3.5l-7.6 8.7L23 22h-7l-5.5-7.2L4.1 22H.6l8.2-9.4L1 2h7.2l5 6.5L18.2 2zm-1.2 18h1.9L7.1 4H5.1L17 20z"/></svg>
          </a>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Insurance Untangled. All rights reserved. &bull; 303 Pinetree Way, Mississauga, Ontario L5G 2R4</span>
          <span style={{ color: "rgba(255,255,255,.3)" }}>
            Powered by{" "}
            <a href="https://www.ekwa.com/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(168,196,228,.5)", textDecoration: "none" }}>
              Ekwa Marketing
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
