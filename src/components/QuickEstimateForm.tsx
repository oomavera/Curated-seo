"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PillButton from "./ui/PillButton";

interface QuickEstimateFormProps {
	onSubmitSuccess?: () => void;
	title?: string;
	submitLabel?: string;
	trackMetaLead?: boolean;
	metaEventName?: string;
	showEmail?: boolean;
	openCalendarOnSuccess?: boolean;
}

export default function QuickEstimateForm({ onSubmitSuccess, title = "Quick Free Estimate", submitLabel = "Get Quick Estimate", trackMetaLead = false, metaEventName = "Lead", showEmail = true }: QuickEstimateFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			// Generate a deduplication event_id to share with server-side CAPI
			const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			// Build a lightweight external_id (sha256 will be applied on server if needed)
			const externalId = formData.email || formData.phone || formData.name || undefined;
			const response = await fetch('/api/leads', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					source: 'Landing Page',
					eventId,
					externalId,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			setSuccess(true);

			// Meta Pixel conversion (only when enabled)
			if (trackMetaLead && typeof window !== 'undefined') {
				const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
				try {
					fbq?.('track', metaEventName, {
						event_id: eventId,
						content_name: 'Offer Lead',
						event_source: 'offer',
						lead_source: 'main_form'
					});
				} catch {}
			}
			// Redirect to /schedule after successful submission
			if (typeof window !== 'undefined') {
				window.location.assign('/schedule');
				return;
			}
			onSubmitSuccess?.();
		} catch {
			setError('Something went wrong. Please try again or call us directly.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (success) {
		return (
			<motion.div 
				className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl p-6 shadow-xl text-center"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
			>
				<div className="text-green-600 mb-4">
					<svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
					</svg>
				</div>
				<h3 className="text-xl font-semibold text-midnight mb-2">Thank you!</h3>
				<p className="text-mountain mb-4">
					You&apos;re all set. Our phones are open — call now, or we&apos;ll call you within 5 minutes.
				</p>
				<PillButton 
					onClick={() => { window.location.href = 'tel:+14072700379'; }} 
					className="w-full justify-center"
				>
					Call Now
				</PillButton>
				<div className="text-xs text-mountain mt-3">We will call you from 407-470-1780</div>
				<button
					onClick={() => {
						setSuccess(false);
						setFormData({ name: "", phone: "", email: "" });
					}}
					className="text-mountain hover:text-midnight transition-colors text-sm underline mt-4"
				>
					Submit another request
				</button>
			</motion.div>
		);
	}

	return (
		<motion.div 
			className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="text-center mb-6">
				<div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-mountain/10 to-apres-ski/10 rounded-full border border-mountain/20">
					<div className="w-2 h-2 bg-gradient-to-r from-mountain to-midnight rounded-full animate-pulse"></div>
					<h2 className="text-lg font-semibold text-midnight tracking-wider">{title}</h2>
				</div>
				<p className="text-sm text-mountain">Get your personalized cleaning quote in 60 seconds</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-midnight mb-2">
						Full Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						className="input-glass px-4 py-3 w-full text-midnight placeholder-mountain/60 rounded-full"
						placeholder="Enter your full name"
					/>
				</div>

				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-midnight mb-2">
						Phone Number *
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						required
						className="input-glass px-4 py-3 w-full text-midnight placeholder-mountain/60 rounded-full"
						placeholder="(407) 123-4567"
					/>
				</div>

				{showEmail && (
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-midnight mb-2">
							Email Address (optional)
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="input-glass px-4 py-3 w-full text-midnight placeholder-mountain/60 rounded-full"
							placeholder="your@email.com"
						/>
					</div>
				)}

				{error && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-800">{error}</p>
					</div>
				)}

				<PillButton type="submit" disabled={isSubmitting} className="w-full" animated={!isSubmitting}>
					{isSubmitting ? (
						<span className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-arctic border-t-transparent rounded-full animate-spin"></div>
							Submitting...
						</span>
					) : (
						submitLabel
					)}
				</PillButton>
			</form>

			<div className="mt-4 text-center text-xs text-mountain">
				By submitting, you agree to receive calls and texts about our services. 
				<br />
				We respect your privacy and won&apos;t spam you.
			</div>
		</motion.div>
	);
}