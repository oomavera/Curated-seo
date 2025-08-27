import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import LocalSchema from "../components/LocalSchema";
import MetaPixel from "../components/MetaPixel";

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

export const metadata: Metadata = {
  title: "Best House Cleaning Services Oviedo FL | Curated Cleanings | Free Estimate",
  description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. Serving Oviedo, Winter Park, Casselberry, Winter Springs. 5-star rated. Book free estimate today!",
  keywords: "house cleaning Oviedo FL, best cleaning services Oviedo Florida, residential cleaning Oviedo, maid service Oviedo, deep cleaning Oviedo, professional cleaners Oviedo, home cleaning Winter Park, cleaning services Casselberry, move in cleaning Oviedo, move out cleaning Oviedo, weekly cleaning Oviedo, biweekly cleaning Oviedo",
  openGraph: {
    title: "Best House Cleaning Services Oviedo FL | Curated Cleanings",
    description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. 5-star rated. Book free estimate today!",
    type: "website",
    locale: "en_US",
    siteName: "Curated Cleanings",
    url: "https://curatedcleanings.com",
    images: [
      {
        url: "https://curatedcleanings.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Curated Cleanings - Professional House Cleaning Services Oviedo FL"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best House Cleaning Services Oviedo FL | Curated Cleanings",
    description: "Top-rated house cleaning services in Oviedo, Florida. Professional residential cleaning starting at $125. 5-star rated.",
    images: ["https://curatedcleanings.com/twitter-image.jpg"]
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
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans bg-snow min-h-screen`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <LocalSchema />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
