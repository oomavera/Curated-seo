import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Cleaning Lake Mary FL | Curated Cleanings',
  description: 'House cleaning Lake Mary FL homeowners trust—flat-rate (avg $210), eco-friendly options, and $25 off your first clean. Get a fast, no-pressure estimate today.',
  openGraph: {
    title: 'House Cleaning Lake Mary FL | Curated Cleanings',
    description: 'House cleaning Lake Mary FL homeowners trust—flat-rate (avg $210), eco-friendly options, and $25 off your first clean.',
    url: 'https://curatedcleanings.com/house-cleaning-lake-mary-fl',
  },
}

export default function LakeMaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}