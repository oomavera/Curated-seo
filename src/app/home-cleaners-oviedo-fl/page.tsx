import type { Metadata } from "next";
import HomeLandingPage from "@/components/HomeLandingPage";

export const metadata: Metadata = {
	title: "Professional Home Cleaners in Oviedo, FL | Curated Cleanings",
	description: "Our locally-owned Curated Cleanings Oviedo, FL team is available for all your home and business cleaning needs. Learn more about our 5-star Promise!",
};

export default function HomeCleanersOviedoPage() {
	return (
			<HomeLandingPage
				formPage="home-cleaners-oviedo-fl"
				heroTitle="Home cleaners in Oviedo"
				heroSubtitle="Oviedo Florida House Cleaning Services"
				formTitle="Free Cleaning Voucher"
				formSubmitLabel="Get Free Cleaning Voucher"
				formButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
				popupCallout="Free Cleaning Voucher"
				popupSubmitLabel="Get Free Cleaning Voucher"
				popupButtonClassName="bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50"
				introContent={
						<>
							<p className="mb-4">
								Tired of the never-ending cycle of house cleaning? Want to get back more time with family and friends? The home cleaning professionals at Curated Cleanings bring an advanced cleaning process, modern tools, and a friendly local team so your home always looks and feels refreshed.
							</p>
							<p>
								Our Oviedo cleaning company can customize a plan for anything from one-time deep cleaning to weekly maintenance. Whether you need us in Kingsbridge, Tuscawilla, or anywhere else you call home, we&apos;ll tailor a cleaning and disinfecting schedule that keeps every room guest-ready without you lifting a finger.
							</p>
						</>
					}
				/>
			);
	}
