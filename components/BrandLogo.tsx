// components/BrandLogo.tsx
// Place this at: components/BrandLogo.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import { getBrandLogoUrl } from "@/lib/brandLogos";

interface BrandLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({
  name,
  size = 48,
  className = "",
}: BrandLogoProps) {
  const primaryUrl = getBrandLogoUrl(name);

  // Fallback chain: Brandfetch/Clearbit → Google favicon → initials
  const [imgSrc, setImgSrc] = useState(primaryUrl);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleError = () => {
    if (fallbackLevel === 0) {
      // Try Google's favicon service
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      setImgSrc(
        `https://www.google.com/s2/favicons?sz=128&domain=${slug}.com`
      );
      setFallbackLevel(1);
    } else {
      // Give up — show initials avatar
      setFallbackLevel(2);
    }
  };

  if (fallbackLevel === 2) {
    // Initials fallback
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={imgSrc}
        alt={`${name} logo`}
        fill
        className="object-contain"
        onError={handleError}
        unoptimized // Required for external URLs
      />
    </div>
  );
}
