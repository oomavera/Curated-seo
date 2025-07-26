import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Cleaning Oviedo FL | Curated Cleanings',
  description: 'House cleaning Oviedo FL families trust. Flat-rate pricing (avg $205), eco-friendly options, and $25 off your first clean. Get a fast, no-pressure estimate.',
  openGraph: {
    title: 'House Cleaning Oviedo FL | Curated Cleanings',
    description: 'House cleaning Oviedo FL families trust. Flat-rate pricing (avg $205), eco-friendly options, and $25 off your first clean.',
    url: 'https://curatedcleanings.com/house-cleaning-oviedo-fl',
  },
}

export default function OviedoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 