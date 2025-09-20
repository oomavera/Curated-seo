"use client";
import { useEffect } from "react";

type MetaPixelProps = {
	pixelId?: string;
};

type FbqArgs = ["init", string] | ["track", string, Record<string, unknown>?];
type FbqFunction = (...args: FbqArgs) => void;
type FbqStub = FbqFunction & {
	callMethod?: (...args: FbqArgs) => void;
	queue: FbqArgs[];
	loaded?: boolean;
	version?: string;
};

declare global {
	interface Window {
		fbq?: FbqFunction;
		_fbq?: FbqFunction;
	}
}

// Loads Meta Pixel once per app session using the official fbq bootstrap stub
export default function MetaPixel({
	pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1290791285375063",
}: MetaPixelProps) {
	useEffect(() => {
		if (!pixelId) return;
		if (typeof window === "undefined" || typeof document === "undefined") return;
		// Defer initialization to after first user interaction to avoid competing with LCP
		let initialized = false;
		const init = () => {
			if (initialized) return; initialized = true;
		// Create the fbq stub and inject fbevents.js if needed
		const ensureFbq = (): FbqFunction => {
			const w = window as Window & { fbq?: FbqFunction | FbqStub; _fbq?: FbqFunction | FbqStub };
			if (typeof w.fbq === "function") return w.fbq as FbqFunction;

			const fbqStub: FbqStub = ((...args: FbqArgs) => {
				if (fbqStub.callMethod) {
					fbqStub.callMethod(...args);
				} else {
					fbqStub.queue.push(args);
				}
			}) as FbqStub;
			fbqStub.queue = [];
			fbqStub.loaded = true;
			fbqStub.version = "2.0";
			w.fbq = fbqStub;
			w._fbq = fbqStub;

			const scriptId = "facebook-pixel";
			if (!document.getElementById(scriptId)) {
				const s = document.createElement("script");
				s.id = scriptId;
				s.async = true;
				s.src = "https://connect.facebook.net/en_US/fbevents.js";
				document.head.appendChild(s);
			}
			return w.fbq as FbqFunction;
		};

			const fbq = ensureFbq();
			// Queue init + PageView (these will flush when fbevents.js finishes loading)
			try {
				const pageViewEventId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
				fbq("init", String(pixelId));
				fbq("track", "PageView", { event_id: pageViewEventId });
			} catch {}
		};
		const onFirstInput = () => { init(); cleanup(); };
		const cleanup = () => {
			window.removeEventListener('pointerdown', onFirstInput);
			window.removeEventListener('keydown', onFirstInput);
			document.removeEventListener('visibilitychange', onVis);
		};
		const onVis = () => { if (document.visibilityState === 'visible') { init(); cleanup(); } };
		window.addEventListener('pointerdown', onFirstInput, { once: true, passive: true });
		window.addEventListener('keydown', onFirstInput, { once: true });
		document.addEventListener('visibilitychange', onVis);
		return cleanup;
	}, [pixelId]);

	return null;
}
