"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxAurora() {
	const { scrollY } = useScroll();
	const ySlow = useTransform(scrollY, (v) => v * -0.05);
	const yMed = useTransform(scrollY, (v) => v * -0.1);
	const yFast = useTransform(scrollY, (v) => v * -0.16);

	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ isolation: "isolate" }}>
			{/* Base soft wash */}
			<div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 100%)" }} />

			{/* Wide blurred color beds */}
			<motion.div
				style={{ y: ySlow, filter: "blur(60px)", background: "radial-gradient(60% 60% at 10% 0%, rgba(255,182,193,0.9), rgba(255,182,193,0))" }}
				className="absolute -left-1/4 -top-1/4 w-[120vw] h-[80vh] opacity-70"
			/>
			<motion.div
				style={{ y: yMed, filter: "blur(60px)", background: "radial-gradient(55% 55% at 100% 10%, rgba(173,216,230,0.9), rgba(173,216,230,0))" }}
				className="absolute -right-1/4 top-0 w-[120vw] h-[70vh] opacity-70"
			/>

			{/* Aurora streaks (elongated, feathered) */}
			<motion.div
				style={{ y: yFast, rotate: -12, background: "linear-gradient(90deg, rgba(255,255,176,0) 0%, rgba(255,255,176,0.75) 40%, rgba(255,255,176,0) 100%)", filter: "blur(30px) saturate(120%)" }}
				className="absolute left-[-10%] top-[10%] w-[140%] h-[28vh] opacity-70"
			/>
			<motion.div
				style={{ y: yMed, rotate: 8, background: "linear-gradient(90deg, rgba(216,191,255,0) 0%, rgba(216,191,255,0.55) 45%, rgba(216,191,255,0) 100%)", filter: "blur(36px) saturate(120%)" }}
				className="absolute left-[-20%] top-[45%] w-[160%] h-[26vh] opacity-60"
			/>
			<motion.div
				style={{ y: ySlow, rotate: -5, background: "linear-gradient(90deg, rgba(173,216,230,0) 0%, rgba(173,216,230,0.55) 40%, rgba(173,216,230,0) 100%)", filter: "blur(34px) saturate(115%)" }}
				className="absolute left-[-10%] bottom-[5%] w-[150%] h-[20vh] opacity-60"
			/>

			<div className="noise-overlay" />
		</div>
	);
}


