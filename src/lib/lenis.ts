// src/lib/lenis.ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =========================================================================
// 1. Easing Presets Configuration
// =========================================================================
export const EASING_PRESETS = {
	smooth: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // High-end exponential ease
	gentle: (t: number) => 1 - Math.pow(1 - t, 3), // Soft cubic ease
	snappy: (t: number) => 1 - Math.pow(1 - t, 4), // Fast responsive ease
	linear: (t: number) => t, // Uniform motion
} as const;

export function initLenisSmoothScroll(): Lenis | null {
	// Respect reduced motion & fall back to native scroll below 768px
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const isMobile = window.innerWidth < 768;

	if (prefersReducedMotion || isMobile) {
		document.documentElement.style.scrollBehavior = "smooth";
		return null;
	}

	// Initialize Lenis
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

	// Sync Lenis scroll with ScrollTrigger
	lenis.on("scroll", ScrollTrigger.update);

	// Sync Lenis RAF with GSAP Ticker for silky 60fps frame rate
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	// Disable GSAP lag smoothing to maintain continuous frame rate
	gsap.ticker.lagSmoothing(0);

	// Expose globally
	(window as any).lenis = lenis;

	// =========================================================================
	// 2. Smart Smooth Anchor Link Interceptor
	// =========================================================================
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

	// =========================================================================
	// 3. Modal Scroll-Locking Observer
	// =========================================================================
	const bodyObserver = new MutationObserver(() => {
		const isLocked = document.body.classList.contains("is-locked");
		if (isLocked) {
			lenis.stop();
		} else {
			lenis.start();
		}
	});

	bodyObserver.observe(document.body, {
		attributes: true,
		attributeFilter: ["class"],
	});

	// Resync Lenis measurements when preloader curtain finishes
	window.addEventListener("preloader-complete", () => {
		lenis.resize();
		ScrollTrigger.refresh();
	});

	return lenis;
}
