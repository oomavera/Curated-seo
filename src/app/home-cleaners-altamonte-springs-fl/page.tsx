import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Altamonte Springs, FL | Curated Cleanings",
	description: "Altamonte Springs homeowners rely on Curated Cleanings for recurring, deep, and move-ready services with pro equipment and our 5-Star Promise.",
};

export default function HomeCleanersAltamonteSpringsPage() {
	return (
		<HomeLandingPage
			formPage="home-cleaners-altamonte-springs-fl"
			heroTitle="Home cleaners in Altamonte Springs"
			heroSubtitle="Altamonte Springs Florida House Cleaning Services"
			formTitle="Free Cleaning Voucher"
			formSubmitLabel="Get Free Cleaning Voucher"
			formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			popupCallout="Free Cleaning Voucher"
			popupSubmitLabel="Get Free Cleaning Voucher"
			popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			introContent={
				<>
					<p className="mb-4">
						From Uptown’s high-rises to the neighborhoods off Montgomery Road, Curated Cleanings keeps Altamonte Springs homes spotless with consistent teams, pro-grade vacuums, and photo-verified finishes. Spend your weekends at Cranes Roost Park—not catching up on chores.
					</p>
					<p>
						Book weekly, bi-weekly, or monthly visits and we&apos;ll customize a plan that includes all supplies, priority scheduling, and our 5-Star Promise. We handle condos, single-family homes, and move-ready cleanings anywhere across Altamonte Springs.
					</p>
				</>
			}
		/>
	);
}
