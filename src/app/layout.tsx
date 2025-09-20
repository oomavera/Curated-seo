import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import LocalSchema from "../components/LocalSchema";
import MetaPixel from "../components/MetaPixel";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "600"], // Only include used weights
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "600"], // Only include used weights
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curatedcleanings.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Seminole County House Cleaning | Deep & Standard Cleaning | Oviedo, Lake Mary, Winter Springs, Heathrow, Winter Park, Sanford, Geneva, Longwood, Casselberry",
  description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. Serving Oviedo, Winter Park, Casselberry, Winter Springs. 5-star rated. Book free estimate today!",
  keywords: "house cleaning Oviedo FL, best cleaning services Oviedo Florida, residential cleaning Oviedo, maid service Oviedo, deep cleaning Oviedo, professional cleaners Oviedo, home cleaning Winter Park, cleaning services Casselberry, move in cleaning Oviedo, move out cleaning Oviedo, weekly cleaning Oviedo, biweekly cleaning Oviedo",
  openGraph: {
    title: "Seminole County House Cleaning | Deep & Standard Cleaning | Oviedo, Lake Mary, Winter Springs, Heathrow, Winter Park, Sanford, Geneva, Longwood, Casselberry",
    description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. 5-star rated. Book free estimate today!",
    type: "website",
    locale: "en_US",
    siteName: "Curated Cleanings",
    url: "https://curatedcleanings.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Curated Cleanings - Professional House Cleaning Services Oviedo FL"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Seminole County House Cleaning | Deep & Standard Cleaning | Oviedo, Lake Mary, Winter Springs, Heathrow, Winter Park, Sanford, Geneva, Longwood, Casselberry",
    description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. 5-star rated.",
    images: ["/og.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // You'll need to get this from Google Search Console
    yandex: "your-yandex-verification-code"
  },
  alternates: {
    canonical: "https://curatedcleanings.com"
  },
  icons: {
    icon: [
      { url: "/NewestFavicon.png", type: "image/png" },
      { url: "/NewestFavicon.png", sizes: "32x32", type: "image/png" },
      { url: "/NewestFavicon.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/NewestFavicon.png",
    apple: "/NewestFavicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-KE5YL6M3Q5";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Early connections */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://stats.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/* Preload LCP logo if it appears above the fold */}
        <link rel="preload" as="image" href="/Logo2.png" />
      </head>
      <body className={`${inter.variable} ${sora.variable} bg-snow min-h-screen`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* GA4 - load after interactive to avoid blocking main thread */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <LocalSchema />
        <MetaPixel />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
