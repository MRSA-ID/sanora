import { gsap } from "gsap";

export function initPageTransitions() {
	const overlay = document.getElementById("page-transition-overlay");
	if (!overlay) return;

	// Before page swap: animate transition overlay in
	document.addEventListener("astro:before-preparation", () => {
		gsap.to(overlay, {
			yPercent: 0,
			duration: 0.6,
			ease: "power3.inOut",
		});
	});

	// After page swap: animate transition overlay out
	document.addEventListener("astro:after-swap", () => {
		gsap.to(overlay, {
			yPercent: -100,
			duration: 0.6,
			ease: "power3.inOut",
			onComplete: () => {
				gsap.set(overlay, { yPercent: 100 });
			},
		});
	});
}
