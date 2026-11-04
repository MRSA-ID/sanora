// src/lib/lenis.ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const EASING_PRESETS = {
	smooth: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	gentle: (t: number) => 1 - Math.pow(1 - t, 3),
	snappy: (t: number) => 1 - Math.pow(1 - t, 4),
	linear: (t: number) => t,
} as const;

export function initLenisSmoothScroll(): Lenis | null {
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const isMobile = window.innerWidth < 768;

	if (prefersReducedMotion || isMobile) {
		document.documentElement.style.scrollBehavior = "smooth";
		return null;
	}

	const lenis = new Lenis({
		duration: 1.2,
		lerp: 0.085,
		easing: EASING_PRESETS.gentle,
		orientation: "vertical",
		gestureOrientation: "vertical",
		smoothWheel: true,
		wheelMultiplier: 1.0,
		touchMultiplier: 1.5,
		syncTouch: false,
	});

	// Synchronize Lenis scroll position with GSAP ScrollTrigger
	lenis.on("scroll", () => {
		ScrollTrigger.update();
	});

	// Sync Lenis RAF with GSAP Ticker for smooth 60fps execution
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	(window as any).lenis = lenis;

	// Helper function for full ScrollTrigger layout recalculation
	const refreshLayout = () => {
		lenis.resize();
		ScrollTrigger.sort();
		ScrollTrigger.refresh();
	};

	// 1. Refresh when custom preloader animation completes
	window.addEventListener("preloader-complete", () => {
		requestAnimationFrame(() => {
			refreshLayout();
		});
	});

	// 2. Refresh when all images (including dynamic GIFs) finish downloading
	window.addEventListener("load", () => {
		requestAnimationFrame(() => {
			refreshLayout();
		});
	});

	// 3. Refresh when custom Web fonts finish loading & rendering
	if (document.fonts) {
		document.fonts.ready.then(() => {
			refreshLayout();
		});
	}

	// 4. Smart Smooth Anchor Link Interceptor
	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest("a");

		if (anchor && anchor.hash && anchor.origin === window.location.origin) {
			const targetElement = document.querySelector(anchor.hash);
			if (targetElement) {
				e.preventDefault();
				lenis.scrollTo(targetElement as HTMLElement, {
					offset: 0,
					duration: 1.2,
					easing: EASING_PRESETS.gentle,
				});
			}
		}
	});

	// 5. Modal Scroll-Locking Observer
	const bodyObserver = new MutationObserver(() => {
		const isLocked = document.body.classList.contains("is-locked");
		if (isLocked) {
			lenis.stop();
		} else {
			lenis.start();
			refreshLayout();
		}
	});

	bodyObserver.observe(document.body, {
		attributes: true,
		attributeFilter: ["class"],
	});

	return lenis;
}
