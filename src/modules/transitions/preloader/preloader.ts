// src/modules/transitions/preloader.ts
import { gsap } from "gsap";

let mainTl: gsap.core.Timeline | null = null;
let isLooping = false;

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

	// Split bottom label & hero text into mask wrappers
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

	// Set initial hidden state for Hero elements
	if (heroContainer) {
		gsap.set(heroContainer, { yPercent: 0, visibility: "visible" });

		// Hidden state for Hero Headline
		gsap.set(".hero-headline", {
			opacity: 0,
			y: 40,
			filter: "blur(12px)",
		});

		// Hidden state for Hero Image
		gsap.set(".hero-image", {
			opacity: 0,
			scale: 0.95,
			y: 30,
			filter: "blur(10px)",
		});

		// Hidden state for Hero Bottom split text
		gsap.set(".hero-bottom .split-item", {
			yPercent: 120,
			opacity: 0,
			filter: "blur(8px)",
		});
	}
}

export function runPreloaderAnimation() {
	if (mainTl) mainTl.kill();

	resetAnimationState();

	const preloader = document.getElementById("preloader");
	const shaderContainer = document.getElementById("shader-mask-container");
	const logoWrapper = document.getElementById("logo-wrapper");
	const slider = document.getElementById(
		"progress-slider",
	) as HTMLInputElement | null;
	const progressVal = document.getElementById("progress-val");

	if (!preloader || !shaderContainer || !logoWrapper) return;

	const fillDuration = 4.0;

	mainTl = gsap.timeline({
		onUpdate: () => {
			if (mainTl && slider && progressVal) {
				const currentTime = mainTl.time();
				const fillProgress = Math.min(currentTime / fillDuration, 1.0);
				const percent = Math.round(fillProgress * 100);

				slider.value = (fillProgress * 100).toString();
				progressVal.innerText = `${percent}%`;
			}
		},
		onComplete: () => {
			setScrollLocked(false);
			if (!isLooping) {
				preloader.style.display = "none";
			}
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

		// --- HERO REVEAL SEQUENCE (with slight delay) ---
		// 6. Reveal Hero Headline with blur & split position
		.to(
			".hero-headline",
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 1.0,
				ease: "power3.out",
			},
			"+=0.15",
		)

		// 7. Reveal Hero Image with scale & blur
		.to(
			".hero-image",
			{
				opacity: 1,
				scale: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 1.1,
				ease: "power3.out",
			},
			"-=0.7",
		)

		// 8. Reveal Hero Bottom split text lines
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

export function initPreloaderControls() {
	const btnReplay = document.getElementById("btn-replay");
	const btnTogglePlay = document.getElementById("btn-toggle-play");
	const toggleLoop = document.getElementById("toggle-loop") as HTMLInputElement;
	const slider = document.getElementById("progress-slider") as HTMLInputElement;

	if (btnReplay)
		btnReplay.addEventListener("click", () => runPreloaderAnimation());

	if (btnTogglePlay) {
		btnTogglePlay.addEventListener("click", () => {
			if (!mainTl) return;
			if (mainTl.paused()) {
				mainTl.resume();
				btnTogglePlay.textContent = "Pause";
			} else {
				mainTl.pause();
				btnTogglePlay.textContent = "Play";
			}
		});
	}

	if (toggleLoop) {
		isLooping = toggleLoop.checked;
		toggleLoop.addEventListener("change", (e) => {
			isLooping = (e.target as HTMLInputElement).checked;
		});
	}

	if (slider) {
		slider.addEventListener("input", () => {
			if (!mainTl) return;
			mainTl.pause();

			const fillDuration = 5.0;
			const prog = parseFloat(slider.value) / 100;

			mainTl.time(prog * fillDuration);

			if (btnTogglePlay) btnTogglePlay.textContent = "Play";
		});
	}

	runPreloaderAnimation();
}
