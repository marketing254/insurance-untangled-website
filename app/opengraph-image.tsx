import { ImageResponse } from "next/og";

// Required for output: "export" — pre-render this image at build time
export const dynamic = "force-static";

export const alt = "Insurance Untangled | Decoding Dental Insurance for Dentists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0d1a30 0%, #1b2a4a 50%, #243260 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative teal glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,160,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Decorative teal glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,160,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 80px 0" }}>
          {/* Brand pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#14C6C0",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#0EA5A0",
              }}
            >
              Insurance Untangled
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.08,
              maxWidth: "760px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Decoding</span>
            <span style={{ color: "#14C6C0" }}>Dental Insurance</span>
            <span>for Dentists.</span>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              padding: "0 80px 40px",
            }}
          >
            {[
              { val: "137+", lbl: "Episodes" },
              { val: "$3B+", lbl: "Recovered" },
              { val: "16+", lbl: "CE Webinars" },
              { val: "Free", lbl: "Always" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingRight: i < 3 ? "32px" : "0" }}>
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 900,
                      color: "#ffffff",
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {stat.val}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(168,196,228,0.7)",
                      fontFamily: "'Courier New', monospace",
                      letterSpacing: "0.08em",
                      marginTop: "4px",
                    }}
                  >
                    {stat.lbl}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "rgba(255,255,255,0.12)",
                      marginRight: "32px",
                      display: "flex",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Teal bottom bar */}
          <div
            style={{
              background: "linear-gradient(90deg, #0EA5A0 0%, #14C6C0 100%)",
              height: "6px",
              width: "100%",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
