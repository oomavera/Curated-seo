"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "ghost";
	animated?: boolean;
};

export default function PillButton({ variant = "primary", className = "", animated = false, ...rest }: Props) {
	const base =
		"rounded-full px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 relative overflow-hidden";
	
	const styles =
		variant === "primary"
			? animated
				? "bg-gradient-to-r from-midnight via-mountain to-apres-ski text-white border border-white/60 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_24px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_15px_30px_rgba(0,0,0,0.12)] active:shadow-inner focus-visible:ring-white/70 animate-pulse"
				: "bg-white/80 text-midnight border border-white/60 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_24px_rgba(0,0,0,0.08)] hover:bg-white/90 active:shadow-inner focus-visible:ring-white/70"
			: "bg-white/10 text-snow border border-white/30 backdrop-blur-xl hover:bg-white/15 active:shadow-inner focus-visible:ring-white/40";

	return (
		<button className={`${base} ${styles} ${className}`} {...rest}>
			{animated && (
				<>
					{/* Exploding pink/peach swirl background */}
					<div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-300 via-orange-300 via-peach-400 to-pink-500 opacity-90 animate-spin-slow rounded-full"></div>
					{/* Secondary color burst */}
					<div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 via-pink-300 to-orange-400 opacity-70 animate-spin-reverse rounded-full"></div>
					{/* Bouncing peach accents */}
					<div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-200/60 via-peach-300/40 to-orange-200/50 animate-bounce-slow rounded-full"></div>
					{/* Exploding radial burst */}
					<div className="absolute inset-0 bg-radial-gradient from-pink-300/80 via-rose-400/60 to-transparent animate-pulse-fast rounded-full"></div>
					{/* Content overlay */}
					<div className="relative z-10 drop-shadow-sm">{rest.children}</div>
				</>
			)}
			{!animated && rest.children}
		</button>
	);
}
