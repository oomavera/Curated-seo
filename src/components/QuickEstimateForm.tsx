"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PillButton from "./ui/PillButton";

interface QuickEstimateFormProps {
	onSubmitSuccess?: () => void;
}

export default function QuickEstimateForm({ onSubmitSuccess }: QuickEstimateFormProps) {
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
			const response = await fetch('/api/leads', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					source: 'Landing Page'
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			setSuccess(true);
			if (typeof window !== 'undefined' && (window as typeof window & { Cal?: unknown }).Cal) {
				const Cal = (window as typeof window & { Cal: unknown }).Cal as {
					(action: string, namespace: string, config: Record<string, unknown>): void;
					ns: { [key: string]: (action: string, config: Record<string, unknown>) => void };
				};
				Cal("init", "firstclean", {origin:"https://app.cal.com"});
				Cal.ns.firstclean("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
				const calButton = document.getElementById('cal-trigger-button');
				if (calButton) calButton.click();
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
				<h3 className="text-xl font-semibold text-midnight mb-2">Thank You!</h3>
				<p className="text-mountain mb-4">
					We&apos;ve received your request. Our calendar should have opened - please select a time that works for you.
				</p>
				<button
					onClick={() => {
						setSuccess(false);
						setFormData({ name: "", phone: "", email: "" });
					}}
					className="text-mountain hover:text-midnight transition-colors text-sm underline"
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
					<h2 className="text-lg font-semibold text-midnight tracking-wider">Quick Free Estimate</h2>
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

				<div>
					<label htmlFor="email" className="block text-sm font-medium text-midnight mb-2">
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						className="input-glass px-4 py-3 w-full text-midnight placeholder-mountain/60 rounded-full"
						placeholder="your@email.com"
					/>
				</div>

				{error && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-800">{error}</p>
					</div>
				)}

				<PillButton type="submit" disabled={isSubmitting} className="w-full">
					{isSubmitting ? (
						<span className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-arctic border-t-transparent rounded-full animate-spin"></div>
							Submitting...
						</span>
					) : (
						"Get Quick Estimate"
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