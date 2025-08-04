import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Booking | Curated Cleanings - Schedule House Cleaning',
  description: 'Book your house cleaning service online with Curated Cleanings. Get instant estimates, customize your service, and schedule professional cleaning in Orlando, Winter Park, Lake Mary, and Oviedo FL.',
  keywords: 'online booking, house cleaning, schedule cleaning, Orlando cleaning, Winter Park cleaning, Lake Mary cleaning, Oviedo cleaning, instant estimate',
  openGraph: {
    title: 'Online Booking | Curated Cleanings',
    description: 'Book your house cleaning service online with instant estimates and flexible scheduling.',
    url: 'https://curatedcleanings.com/bookonline',
    siteName: 'Curated Cleanings',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Online Booking | Curated Cleanings',
    description: 'Book your house cleaning service online with instant estimates and flexible scheduling.',
  },
  alternates: {
    canonical: 'https://curatedcleanings.com/bookonline',
  },
};

export default function BookOnlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}