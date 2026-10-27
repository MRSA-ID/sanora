import { gsap } from "gsap";

let mainTl: gsap.core.Timeline | null = null;
let isLooping = true;

function setScrollLocked(isLocked: boolean) {
	if (isLocked) {
		document.body.classList.add("is-locked");
	} else {
		document.body.classList.remove("is-locked");
	}
}

function splitTextToMasks(selector: string) {
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

	if (heroContainer) {
		gsap.set(heroContainer, { yPercent: 100, visibility: "visible" });
		gsap.set(".hero-reveal", { opacity: 0, y: 30 });
	}
}

export function runPreloaderAnimation() {
	if (mainTl) mainTl.kill();

	resetAnimationState();

	const preloader = document.getElementById("preloader");
	const heroContainer = document.getElementById("hero-container");
	const shaderContainer = document.getElementById("shader-mask-container");
	const logoWrapper = document.getElementById("logo-wrapper");
	const slider = document.getElementById(
		"progress-slider",
	) as HTMLInputElement | null;
	const progressVal = document.getElementById("progress-val");
	const btnTogglePlay = document.getElementById("btn-toggle-play");

	if (!preloader || !shaderContainer || !logoWrapper) return;

	const fillDuration = 5.0;

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

			if (isLooping) {
				gsap.delayedCall(0.8, runPreloaderAnimation);
			} else {
				preloader.style.display = "none";
			}
		},
	});

	// 1. Slowmotion Fill: inset(100%) -> inset(0%) over 5.0s
	mainTl
		.to(
			shaderContainer,
			{
				clipPath: "inset(0% 0% 0% 0%)",
				duration: fillDuration,
				ease: "none",
			},
			0,
		)
		// 2. Reveal subtitle text when fill hits 90% progress
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
			fillDuration * 0.9,
		)
		// 3. Pause briefly at 100% full text fill
		.to({}, { duration: 0.5 })
		// 4. Stagger exit for subtitle text
		.to(".bottom-label .split-item", {
			yPercent: -125,
			opacity: 0,
			filter: "blur(6px)",
			duration: 0.5,
			stagger: 0.02,
			ease: "power2.in",
		})
		// 5. Blur & scale exit for SNR logo
		.to(
			logoWrapper,
			{
				opacity: 0,
				filter: "blur(12px)",
				scale: 0.92,
				y: -15,
				duration: 0.6,
				ease: "power2.in",
			},
			"<",
		)
		// 6. Swipe up Preloader & reveal Hero container
		.to(
			preloader,
			{
				yPercent: -100,
				duration: 1.2,
				ease: "power4.inOut",
			},
			"-=0.2",
		)
		.to(
			heroContainer,
			{
				yPercent: 0,
				duration: 1.2,
				ease: "power4.inOut",
			},
			"<",
		)
		// 7. Reveal hero elements
		.to(
			".hero-reveal",
			{
				opacity: 1,
				y: 0,
				duration: 0.85,
				stagger: 0.09,
				ease: "power3.out",
			},
			"-=0.5",
		);

	if (btnTogglePlay) btnTogglePlay.textContent = "Pause";
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
