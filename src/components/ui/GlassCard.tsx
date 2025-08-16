"use client";
import React from "react";

type Props = React.PropsWithChildren<{ className?: string; withShadow?: boolean; withEdgeGlow?: boolean }>;

export default function GlassCard({ className = "", withShadow = true, withEdgeGlow = true, children }: Props) {
	return (
		<div className={`relative rounded-[28px] border border-white/30 bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-[24px] backdrop-saturate-150 backdrop-contrast-125 shadow-[0_28px_80px_rgba(0,0,0,0.18)] ${className}`}>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 rounded-t-[28px]" />
			<div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
			{withEdgeGlow && <div className="edge-glow" />}
			{children}
			{withShadow && <div className="glass-shadow" />}
		</div>
	);
}
