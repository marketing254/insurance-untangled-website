"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/podcast/", label: "Podcast" },
  { href: "/events/", label: "Events" },
  { href: "/ppo-negotiation/", label: "PPO Negotiation" },
  { href: "/dental-marketing/", label: "Dental Marketing" },
  { href: "/blog/", label: "Blog" },
  { href: "/resources/", label: "Resources", optHide: true },
  { href: "/reviews/", label: "Reviews", optHide: true },
  { href: "/be-a-guest/", label: "Be a Guest", optHide: true, accent: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fnav">
        <div className="fnav-card">
          <Link href="/" className="fnav-logo">
            <img src="/images/logo.png" alt="Insurance Untangled" width="160" height="40" />
          </Link>
          <ul className="fnav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href} className={item.optHide ? "opt-hide" : undefined}>
                  <Link
                    href={item.href}
                    className={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                    style={item.accent ? { color: "#0EA5A0", fontWeight: 600 } : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="fnav-actions">
            <Link href="/ppo-scorecard/" className="fnav-pill">
              PPO Scorecard
            </Link>
            <Link href="/contact/" className="fnav-cta">
              Contact Us
            </Link>
          </div>
          <button
            className="fnav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <Link href="/" className="fnav-logo" onClick={() => setMobileOpen(false)}>
                <img src="/images/logo.png" alt="Insurance Untangled" />
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="mobile-nav-close">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="mobile-nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : undefined}
                    style={item.accent ? { color: "#0EA5A0", fontWeight: 600 } : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-actions">
              <Link href="/ppo-scorecard/" className="btn-teal" onClick={() => setMobileOpen(false)}>
                PPO Scorecard
              </Link>
              <Link href="/contact/" className="btn-primary" onClick={() => setMobileOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
