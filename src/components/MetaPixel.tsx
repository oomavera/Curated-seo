"use client";
import { useEffect } from "react";

type MetaPixelProps = {
  pixelId?: string;
};

type FbqFunction = (
  ...args: ["init", string] | ["track", string, Record<string, unknown>?]
) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

// Loads Meta Pixel once per app session
export default function MetaPixel({
  pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1290791285375063",
}: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId) return;
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const initialize = () => {
      if (window.fbq) {
        window.fbq("init", pixelId);
        window.fbq("track", "PageView");
      }
    };

    if (window.fbq) {
      initialize();
      return;
    }

    const scriptId = "facebook-pixel";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.onload = initialize;
      document.head.appendChild(script);
    } else {
      initialize();
    }
  }, [pixelId]);

  return null;
}



