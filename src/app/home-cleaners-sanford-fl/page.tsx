import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Sanford, FL | Curated Cleanings",
	description: "Book our Sanford, FL home cleaners for recurring, deep, or move-ready services—always photo-verified and backed by the Curated Cleanings 5-Star Promise.",
};

export default function HomeCleanersSanfordPage() {
	return (
		<HomeLandingPage
			formPage="home-cleaners-sanford-fl"
			heroTitle="Home cleaners in Sanford"
			heroSubtitle="Sanford Florida House Cleaning Services"
			formTitle="Free Cleaning Voucher"
			formSubmitLabel="Get Free Cleaning Voucher"
			formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			popupCallout="Free Cleaning Voucher"
			popupSubmitLabel="Get Free Cleaning Voucher"
			popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			introContent={
				<>
					<p className="mb-4">
						Say goodbye to the weekend cleaning marathon. Curated Cleanings keeps Sanford homes guest-ready with meticulous checklists, photo-verified finishes, and the same friendly team each visit—so you can enjoy the Riverwalk, Historic Downtown, or a day on Lake Monroe instead of scrubbing floors.
					</p>
					<p>
						From gated communities along Celery Avenue to townhomes near the SunRail, we tailor weekly, bi-weekly, and deep cleaning plans that include all supplies, pro-grade vacuums, and our 5-Star Promise. Just choose your cadence and we&apos;ll handle the rest.
					</p>
				</>
			}
		/>
	);
}
