import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Cleaning Orlando FL | Curated Cleanings',
  description: 'House cleaning Orlando FL residents trust—flat-rate (avg $188), eco-friendly options, and $25 off your first clean. Serving downtown, Baldwin Park, College Park & more.',
  openGraph: {
    title: 'House Cleaning Orlando FL | Curated Cleanings',
    description: 'House cleaning Orlando FL residents trust—flat-rate (avg $188), eco-friendly options, and $25 off your first clean.',
    url: 'https://curatedcleanings.com/house-cleaning-orlando-fl',
  },
}

export default function OrlandoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}