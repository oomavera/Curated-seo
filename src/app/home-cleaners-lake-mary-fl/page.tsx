import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Lake Mary, FL | Curated Cleanings",
	description: "Lake Mary homeowners trust Curated Cleanings for recurring, deep, and move-ready house cleaning backed by our 5-Star Promise and photo-verified results.",
};

export default function HomeCleanersLakeMaryPage() {
	return (
		<HomeLandingPage
			formPage="home-cleaners-lake-mary-fl"
			heroTitle="Home cleaners in Lake Mary"
			heroSubtitle="Lake Mary Florida House Cleaning Services"
			formTitle="Free Cleaning Voucher"
			formSubmitLabel="Get Free Cleaning Voucher"
			formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			popupCallout="Free Cleaning Voucher"
			popupSubmitLabel="Get Free Cleaning Voucher"
			popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			introContent={
				<>
					<p className="mb-4">
						Whether you&apos;re entertaining along International Parkway or trying to keep up with life in Heathrow, Curated Cleanings gives Lake Mary homeowners their weekends back. Our dedicated teams arrive with pro-grade vacuums, eco-friendly solutions, and a detailed checklist that keeps every room showcase ready.
					</p>
					<p>
						Choose weekly, bi-weekly, or monthly service and we&apos;ll pair you with the same vetted cleaning team, the same start time, and the same photo-verified results every visit. From deep cleans before guests arrive to recurring maintenance, we tailor plans for condos, estates, and everything in between.
					</p>
				</>
			}
		/>
	);
}
