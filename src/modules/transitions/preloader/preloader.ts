// src/modules/transitions/preloader.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let mainTl: gsap.core.Timeline | null = null;
const SESSION_KEY = "has_visited_preloader";

function setScrollLocked(isLocked: boolean) {
	const lenis = (window as any).lenis;
	if (isLocked) {
		document.body.classList.add("is-locked");
		if (lenis) lenis.stop();
	} else {
		document.body.classList.remove("is-locked");
		if (lenis) lenis.start();
	}
}

export function splitTextToMasks(selector: string) {
	const elements = document.querySelectorAll<HTMLElement>(selector);

	elements.forEach((el) => {
		if (el.querySelector(".split-mask")) return;

		const text = el.textContent || "";
		el.innerHTML = "";

		const tokens = text.trim().split(" ");

		tokens.forEach((token, index) => {
			const mask = document.createElement("span");
			mask.className = "split-mask";

			const item = document.createElement("span");
			item.className = "split-item word";
			item.textContent = token + (index < tokens.length - 1 ? "\u00A0" : "");

			mask.appendChild(item);
			el.appendChild(mask);
		});
	});
}

export function resetAnimationState() {
	const preloader = document.getElementById("preloader");
	const heroContainer = document.getElementById("hero-container");
	const shaderContainer = document.getElementById("shader-mask-container");
	const logoWrapper = document.getElementById("logo-wrapper");

	if (!preloader || !shaderContainer || !logoWrapper) return;

	setScrollLocked(true);

	splitTextToMasks(".split-words");

	preloader.style.display = "flex";
	preloader.style.opacity = "1";
	gsap.set(preloader, { yPercent: 0 });

	gsap.set(shaderContainer, { clipPath: "inset(100% 0% 0% 0%)" });

	gsap.set(logoWrapper, {
		opacity: 1,
		filter: "blur(0px)",
		scale: 1,
		y: 0,
	});

	gsap.set(".bottom-label .split-item", {
		yPercent: 125,
		opacity: 0,
		filter: "blur(8px)",
	});

	// Set initial hidden state on Hero wrapper
	if (heroContainer) {
		gsap.set(heroContainer, { yPercent: 0, visibility: "visible" });

		gsap.set(".hero-inner", {
			opacity: 0,
			y: 40,
			filter: "blur(16px)",
		});

		gsap.set(".hero-bottom .split-item", {
			yPercent: 120,
			opacity: 0,
			filter: "blur(8px)",
		});
	}
}

export function skipPreloader() {
	const preloader = document.getElementById("preloader");
	const heroContainer = document.getElementById("hero-container");

	if (preloader) {
		preloader.style.display = "none";
	}

	setScrollLocked(false);

	if (heroContainer) {
		gsap.set(heroContainer, { yPercent: 0, visibility: "visible" });
	}

	// Ensure all Hero elements are fully visible and clear inline styles
	gsap.set(
		".hero-inner, .hero-bottom .split-item, .hero-headline, .hero-image, .hero-bottom",
		{
			clearProps: "opacity,filter,transform,visibility",
		},
	);

	// Trigger lifecycle events & recalculate layout
	window.dispatchEvent(new CustomEvent("preloader-complete"));
	window.dispatchEvent(new Event("resize"));
	ScrollTrigger.refresh();
}

export function runPreloaderAnimation() {
	if (mainTl) mainTl.kill();

	resetAnimationState();

	const preloader = document.getElementById("preloader");
	const shaderContainer = document.getElementById("shader-mask-container");
	const logoWrapper = document.getElementById("logo-wrapper");

	if (!preloader || !shaderContainer || !logoWrapper) return;

	const fillDuration = 4.0;

	mainTl = gsap.timeline({
		onComplete: () => {
			setScrollLocked(false);
			preloader.style.display = "none";

			// Mark session as visited once preloader completes
			try {
				sessionStorage.setItem(SESSION_KEY, "true");
			} catch {
				/* handle private browsing quota exceptions */
			}

			// Clear inline overrides set by preloader
			gsap.set(".hero-inner, .hero-bottom .split-item", {
				clearProps: "opacity,filter,transform",
			});

			// Notify React components & ScrollTrigger
			window.dispatchEvent(new CustomEvent("preloader-complete"));
			window.dispatchEvent(new Event("resize"));
			ScrollTrigger.refresh();
		},
	});

	mainTl
		// 1. Fill Shader Gradient
		.to(
			shaderContainer,
			{
				clipPath: "inset(0% 0% 0% 0%)",
				duration: fillDuration,
				ease: "none",
			},
			0,
		)
		// 2. Preloader Subtitle reveal
		.to(
			".bottom-label .split-item",
			{
				yPercent: 0,
				opacity: 1,
				filter: "blur(0px)",
				duration: 0.85,
				stagger: 0.06,
				ease: "power3.out",
			},
			fillDuration * 0.85,
		)
		.to({}, { duration: 0.4 })
		// 3. Preloader Subtitle exit
		.to(".bottom-label .split-item", {
			yPercent: -125,
			opacity: 0,
			filter: "blur(6px)",
			duration: 0.4,
			stagger: 0.02,
			ease: "power2.in",
		})
		// 4. Logo Exit
		.to(
			logoWrapper,
			{
				opacity: 0,
				filter: "blur(12px)",
				scale: 0.92,
				y: -15,
				duration: 0.5,
				ease: "power2.in",
			},
			"<",
		)
		// 5. Preloader Curtain Swipe Up
		.to(
			preloader,
			{
				yPercent: -100,
				duration: 1.1,
				ease: "power4.inOut",
			},
			"-=0.1",
		)

		// 6. Smooth Reveal for full Hero content wrapper
		.to(
			".hero-inner",
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 1.1,
				ease: "power3.out",
			},
			"+=0.1",
		)

		// 7. Reveal Hero Bottom split text lines
		.to(
			".hero-bottom .split-item",
			{
				yPercent: 0,
				opacity: 1,
				filter: "blur(0px)",
				duration: 0.85,
				stagger: 0.04,
				ease: "power3.out",
			},
			"-=0.8",
		);
}

export function initPreloader() {
	let hasVisited = false;
	try {
		hasVisited = sessionStorage.getItem(SESSION_KEY) === "true";
	} catch {
		hasVisited = false;
	}

	if (hasVisited) {
		skipPreloader();
	} else {
		runPreloaderAnimation();
	}
}
