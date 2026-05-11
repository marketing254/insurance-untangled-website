
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "6rem 0", textAlign: "center" }}>
      <div className="container">
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, color: "var(--ink)", marginBottom: "1rem" }}>
          404
        </h1>
        <p style={{ fontSize: "16px", color: "var(--ink-3)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/podcast/" className="btn-outline">Browse Podcast</Link>
        </div>
      </div>
    </div>
  );
}
