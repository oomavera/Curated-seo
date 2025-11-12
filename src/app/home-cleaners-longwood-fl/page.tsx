import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Longwood, FL | Curated Cleanings",
	description: "Longwood homeowners trust Curated Cleanings for recurring, deep, and move-ready house cleaning powered by pro equipment and our 5-Star Promise.",
};

export default function HomeCleanersLongwoodPage() {
	return (
		<HomeLandingPage
			formPage="home-cleaners-longwood-fl"
			heroTitle="Home cleaners in Longwood"
			heroSubtitle="Longwood Florida House Cleaning Services"
			formTitle="Free Cleaning Voucher"
			formSubmitLabel="Get Free Cleaning Voucher"
			formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			popupCallout="Free Cleaning Voucher"
			popupSubmitLabel="Get Free Cleaning Voucher"
			popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
			introContent={
				<>
					<p className="mb-4">
						In Longwood&apos;s Historic District or along Markham Woods Road, Curated Cleanings delivers spotless results with commercial vacuums, eco-friendly solutions, and the same familiar team every visit. Spend time at Sabal Point or Wekiva instead of scrubbing baseboards.
					</p>
					<p>
						Pick weekly, bi-weekly, or monthly service and we&apos;ll handle the rest: supplies, detailed checklists, photo verification, and our 5-Star Promise. From estate homes to townhomes, Longwood clients trust us to keep every room guest-ready year round.
					</p>
				</>
			}
		/>
	);
}
