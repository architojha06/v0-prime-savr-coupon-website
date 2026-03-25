// lib/brandLogos.ts
// Place this file at: lib/brandLogos.ts in your project root

// Maps brand names (as stored in your DB) to their logo image URLs
// Uses Brandfetch CDN + direct brand CDN URLs for reliability
// For brands without a reliable URL, we fall back to Google's favicon service

export const BRAND_LOGO_MAP: Record<string, string> = {
  // ── Fashion ──────────────────────────────────────────────────────────────
  "Myntra":
    "https://constant.myntassets.com/web/assets/img/MyntraLogo_asset.png",
  "H&M":
    "https://logo.clearbit.com/hm.com",
  "Snitch":
    "https://cdn.brandfetch.io/snitch.co.in/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "The Bear House":
    "https://cdn.brandfetch.io/thebearhouse.in/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Levi's":
    "https://logo.clearbit.com/levis.com",

  // ── Health & Nutrition ────────────────────────────────────────────────────
  "Healthkart":
    "https://cdn.brandfetch.io/healthkart.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "HK Vitals":
    "https://cdn.brandfetch.io/healthkart.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "HKVitals":
    "https://cdn.brandfetch.io/healthkart.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "MuscleBlaze":
    "https://cdn.brandfetch.io/muscleblaze.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "BeBodywise":
    "https://cdn.brandfetch.io/bebodywise.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Clove Oral Care":
    "https://cdn.brandfetch.io/cloveindia.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Manmatters":
    "https://cdn.brandfetch.io/manmatters.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  // ── Missing brands ───────────────────────────────────────────────────────
  "Neemans":
    "https://cdn.brandfetch.io/neemans.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "The Man Company":
    "https://cdn.brandfetch.io/themancompany.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "FirstCry":
    "https://cdn.brandfetch.io/firstcry.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Nilkamal":
    "https://cdn.brandfetch.io/nilkamal.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Go Noise":
    "https://cdn.brandfetch.io/gonoise.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Borosil":
    "https://cdn.brandfetch.io/borosil.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  "Kindlife":
    "https://cdn.brandfetch.io/kindlife.in/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
  

  // ── Beauty / Skincare ────────────────────────────────────────────────────
  "Dot & Key":
  "https://www.google.com/s2/favicons?domain=dotandkey.com&sz=128",

"Forest Essentials":
  "https://www.google.com/s2/favicons?domain=forestessentialsindia.com&sz=128",

"Milton":
  "https://www.google.com/s2/favicons?domain=miltonindia.com&sz=128",
  "The Natural Wash":
    "https://cdn.brandfetch.io/thenaturalwash.in/w/400/h/400?c=1idTJMFDpXflZmCZgfO",

  // ── Electronics ─────────────────────────────────────────────────────────
  "Noise":
    "https://cdn.brandfetch.io/gonoise.com/w/400/h/400?c=1idTJMFDpXflZmCZgfO",
};

/**
 * Returns a logo URL for a brand.
 * Priority: BRAND_LOGO_MAP → Clearbit → Google Favicon fallback
 */
export function getBrandLogoUrl(brandName: string): string {
  if (BRAND_LOGO_MAP[brandName]) {
    return BRAND_LOGO_MAP[brandName];
  }

  // Auto-guess domain from brand name as last resort
  const slug = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://logo.clearbit.com/${slug}.com`;
}

/**
 * BrandLogo component props
 * Usage: <BrandLogo name="Snitch" size={48} />
 */
export interface BrandLogoProps {
  name: string;
  size?: number;
  className?: string;
}
