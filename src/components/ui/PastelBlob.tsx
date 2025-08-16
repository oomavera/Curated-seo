"use client";
import React from "react";

type Props = { className?: string; style?: React.CSSProperties };

export default function PastelBlob({ className = "", style }: Props) {
	return (
		<div
			className={`pointer-events-none absolute -z-10 blur-3xl rounded-full opacity-70 ${className}`}
			style={{
				background:
					"radial-gradient(600px 400px at 30% 20%, rgba(255,182,193,0.35), transparent 60%), radial-gradient(600px 400px at 70% 30%, rgba(173,216,230,0.35), transparent 60%), radial-gradient(500px 350px at 50% 80%, rgba(186,255,201,0.35), transparent 60%)",
				...style,
			}}
		/>
	);
}
