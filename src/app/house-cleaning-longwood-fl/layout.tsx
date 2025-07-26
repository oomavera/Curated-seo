import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Cleaning Longwood FL | Curated Cleanings',
  description: 'House cleaning Longwood FL families trust—flat-rate (avg $220), eco-friendly options, and $25 off your first clean. Serving Sweetwater Oaks, Wekiva Cove & more.',
  openGraph: {
    title: 'House Cleaning Longwood FL | Curated Cleanings',
    description: 'House cleaning Longwood FL families trust—flat-rate (avg $220), eco-friendly options, and $25 off your first clean.',
    url: 'https://curatedcleanings.com/house-cleaning-longwood-fl',
  },
}

export default function LongwoodLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}