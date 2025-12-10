import HomeLandingPage from "@/components/HomeLandingPage";

// Force dynamic rendering to bypass static prerender errors in production
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
	return <HomeLandingPage formPage="home" />;
}
