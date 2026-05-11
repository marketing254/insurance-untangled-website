"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const GATE_KEY = "iu_podcast_unlocked";

interface WebinarGateProps {
  title: string;
  vimeoUrl: string;
  children: React.ReactNode;
}

function vimeoEmbedUrl(url: string): string {
  const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
  if (id) return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
  // If already an embed URL, return as-is
  if (url.includes("player.vimeo.com")) return url;
  return url;
}

export default function WebinarGate({ title, vimeoUrl, children }: WebinarGateProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  // Route protection — if user hasn't completed the gate on the card, send them back
  useEffect(() => {
    if (!localStorage.getItem(GATE_KEY)) {
      router.replace("/events/");
    } else {
      setChecked(true);
    }
  }, [router]);

  // Prevent content flash while redirect is in progress
  if (!checked) return null;

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "var(--r-xl, 18px)",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 20px 50px rgba(11,37,69,.18)",
        }}
      >
        <iframe
          src={vimeoEmbedUrl(vimeoUrl)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
      {children}
    </div>
  );
}
