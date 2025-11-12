import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Winter Springs, FL | Curated Cleanings",
	description: "Winter Springs residents rely on Curated Cleanings for recurring, deep, and move-ready house cleaning with our Dream Clean Kit and 5-Star Promise.",
};

export default function HomeCleanerWinterSpringsPage() {
	return (
		<HomeLandingPage
			formPage="home-cleaner-winter-springs-fl"
			heroTitle="Home cleaners in Winter Springs"
			heroSubtitle="Winter Springs Florida House Cleaning Services"
			formTitle="Free Cleaning Voucher"
			formSubmitLabel="Get Free Cleaning Voucher"
			formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			popupCallout="Free Cleaning Voucher"
			popupSubmitLabel="Get Free Cleaning Voucher"
			popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			introContent={
				<>
					<p className="mb-4">
						Whether you&apos;re near Tuskawilla Country Club or Winter Springs Town Center, Curated Cleanings keeps your home spotless with pro vacuums, eco-friendly products, and detailed checklists. Reclaim your evenings instead of catching up on chores.
					</p>
					<p>
						Choose the cadence that fits—weekly, bi-weekly, or monthly—and we&apos;ll assign the same vetted team with priority scheduling. Every visit includes photo verification and our 5-Star Promise, so Winter Springs homes stay guest-ready year round.
					</p>
				</>
			}
		/>
	);
}
