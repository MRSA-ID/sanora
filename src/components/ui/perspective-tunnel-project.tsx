"use client";

import {
	motion,
	useTransform,
	useReducedMotion,
	useMotionValue,
	useSpring,
	type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
	{
		src: "https://cdn.21st.dev/assets/mirror/c3/c3fbd2afa140223999a441b32ed986f61d473930002708df805a81532a326aac.jpg",
		title: "Chroma I",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/9d/9d8b2f675a5814476ada3736ce439bcda23c5c389e0ebf9b25d8a0c09f3bbcfe.jpg",
		title: "Prism III",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/8b/8bb738bf2f00d7f7ed3c3ec034adb9938ad38f4be4ac191d632a6a11ad525574.jpg",
		title: "Ether IV",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/ac/ac5ac700b188d7ef16ee9dab868098b59f15c440db3f71d4e8c03262a3287577.jpg",
		title: "Quantum V",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/ef/ef25eff6ce655fba459b3b7e7711524dc92499aa18f6c7dbea9a0fcc56a8f908.jpg",
		title: "Nebula VI",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/f2/f28b370a5dcbf76240f1504579c4b05fc0ff0bb990a42aff8dc2f73a5dc46072.jpg",
		title: "Cyber VII",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/f2/f26a1eac85704dda924820392dedfb72d51d8261d35354f83b35d683617295f3.jpg",
		title: "Flux VIII",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/77/7755d23eaaa0aa5b403343f44afa7a29b2d06d3065fe54c602b14ba01d00f2aa.jpg",
		title: "Aether IX",
	},
	{
		src: "https://cdn.21st.dev/assets/mirror/65/657317761fe9058a1d43711b13c543a71eb5199b7a5d9abf4c28479674e39cf7.jpg",
		title: "Chroma X",
	},
];

interface TunnelCardData {
	item: { src: string; title: string };
	angleCos: number;
	angleSin: number;
	radiusFactorX: number;
	radiusFactorY: number;
	rotationZ: number;
	index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = IMAGES.map((item, i) => {
	const goldenAngle = i * 137.5 * (Math.PI / 180);
	const radiusFactorX = 0.28 + (i % 3) * 0.08;
	const radiusFactorY = 0.26 + (i % 2) * 0.09;

	return {
		item,
		angleCos: Math.cos(goldenAngle),
		angleSin: Math.sin(goldenAngle),
		radiusFactorX,
		radiusFactorY,
		rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
		index: i,
	};
});

const SPRING_CONFIG = { stiffness: 50, damping: 28, mass: 0.6 };

interface StageDimensions {
	width: number;
	height: number;
	isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, SPRING_CONFIG);
	const y = useSpring(rawY, SPRING_CONFIG);

	useEffect(() => {
		if (!enabled) return;
		const onMove = (e: PointerEvent) => {
			rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
			rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [enabled, rawX, rawY]);

	return { x, y };
}

interface TunnelCardProps {
	card: TunnelCardData;
	progress: MotionValue<number>;
	pointer: { x: MotionValue<number>; y: MotionValue<number> };
	total: number;
	stage: StageDimensions;
}

function TunnelCard({
	card,
	progress,
	pointer,
	total,
	stage,
}: TunnelCardProps) {
	const staggerSpan = 0.6;
	const start = (card.index / total) * (1 - staggerSpan);
	const end = start + staggerSpan;

	const localProgress = useTransform(progress, [start, end], [0, 1]);

	const farZ = stage.isMobile ? -1200 : -1700;
	const nearZ = stage.isMobile ? 350 : 500;
	const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

	const opacity = useTransform(
		localProgress,
		[0, 0.15, 0.85, 0.98],
		[0, 1, 1, 0],
	);

	const cardWidth = stage.isMobile
		? Math.max(130, Math.min(180, stage.width * 0.38))
		: Math.max(180, Math.min(270, stage.width * 0.18));

	const baseX = card.angleCos * (stage.width * card.radiusFactorX);
	const baseY = card.angleSin * (stage.height * card.radiusFactorY);
	const panStrength = stage.isMobile ? 20 : 45;

	const transform = useTransform(
		[z, pointer.x, pointer.y],
		([currZ, px, py]: number[]) => {
			const offsetX = baseX - px * panStrength;
			const offsetY = baseY - py * panStrength;
			return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
		},
	);

	return (
		<motion.div
			style={{
				width: cardWidth,
				transform,
				opacity,
				zIndex: card.index + 1,
			}}
			className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer">
			<div className="group relative h-full w-full overflow-hidden rounded-2xl bg-sanora-blue-900/40 shadow-2xl shadow-sanora-blue-950/80 ring-1 ring-sanora-blue-400/20 backdrop-blur-md transition-all duration-500 hover:ring-sanora-blue-400/70 hover:shadow-sanora-blue-500/30">
				<img
					src={card.item.src}
					alt={card.item.title}
					draggable={false}
					className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-sanora-blue-950/90 via-sanora-blue-950/20 to-transparent flex items-end p-4 sm:p-5">
					<span className="text-xs sm:text-sm font-geist tracking-widest uppercase text-sanora-neutral-50 drop-shadow-md">
						{card.item.title}
					</span>
				</div>
			</div>
		</motion.div>
	);
}

export default function PerspectiveTunnelProject() {
	const parentRef = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();

	const [stage, setStage] = useState<StageDimensions>({
		width: 1440,
		height: 900,
		isMobile: false,
	});

	useEffect(() => {
		const updateDimensions = () => {
			setStage({
				width: window.innerWidth,
				height: window.innerHeight,
				isMobile: window.innerWidth < 768,
			});
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	// Motion Value driven directly by GSAP ScrollTrigger progress
	const rawProgress = useMotionValue(0);
	const smoothProgress = useSpring(rawProgress, {
		stiffness: 60,
		damping: 30,
		restDelta: 0.0001,
	});

	// GSAP Pinning + Background Color Scrubbing (sanora-blue-950 -> sanora-neutral-50)
	useEffect(() => {
		const parent = parentRef.current;
		const sticky = stickyRef.current;
		if (!parent || !sticky) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: parent,
				start: "center center",
				end: "bottom bottom",
				pin: true,
				pinSpacing: true,
				scrub: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					rawProgress.set(self.progress);
				},
			},
		});

		// Live scrub background color from dark blue to neutral white across 350vh duration
		tl.to([parent, sticky], {
			backgroundColor: "#fafaf8", // var(--color-sanora-neutral-50)
			ease: "none",
		});

		ScrollTrigger.refresh();

		return () => {
			tl.kill();
		};
	}, [rawProgress]);

	const pointer = useCameraParallax(!reduce);

	const titleOpacity = useTransform(
		smoothProgress,
		[0, 0.1, 0.88, 1],
		[0, 1, 1, 0],
	);

	const titleScale = useTransform(
		smoothProgress,
		[0, 0.15, 0.7, 1],
		[0.85, 1, 1, 1.3],
	);

	const titleY = useTransform(smoothProgress, [0, 0.15], [30, 0]);

	const promptOpacity = useTransform(smoothProgress, [0, 0.08, 0.2], [0, 1, 0]);

	// Text color transition as background shifts from dark blue to light neutral
	const labelColor = useTransform(
		smoothProgress,
		[0, 0.7, 1],
		["#c4d8ff", "#243b94", "#0129b0"],
	);

	return (
		/* 350vh Parent Track Duration */
		<section
			ref={parentRef}
			id="perspective-tunnel-parent"
			className="relative z-10 w-full bg-sanora-blue-950 text-sanora-neutral-50 overflow-hidden flex flex-col items-center justify-center font-montreal"
			style={{ height: "250vh", minHeight: "250vh" }}>
			{/* Pinned Vertically Centered Viewport */}
			<div
				ref={stickyRef}
				className="relative w-full h-screen flex flex-col items-center justify-center bg-sanora-blue-950 overflow-hidden"
				style={{
					perspective: stage.isMobile ? "900px" : "1200px",
					transformStyle: "preserve-3d",
				}}>
				{/* Central Anchor Typography */}
				<motion.div
					style={{
						scale: titleScale,
						opacity: titleOpacity,
						y: titleY,
					}}
					className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-2xl font-montreal">
					<motion.p
						style={{ color: labelColor }}
						className="text-xs font-geist uppercase tracking-[0.4em] mb-4">
						highlight project
					</motion.p>
					<h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] bg-gradient-to-b from-sanora-neutral-0 via-sanora-blue-100 to-sanora-blue-300/40 bg-clip-text text-transparent">
						EXPLORE
						<br />
						PROJECTS
					</h1>
				</motion.div>

				{/* Scroll Prompt */}
				<motion.div
					style={{ opacity: promptOpacity }}
					className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-geist uppercase tracking-[0.3em] text-sanora-blue-200/60">
					<span>Scroll to Explore</span>
				</motion.div>

				{/* 3D Z-Space Plane */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{ transformStyle: "preserve-3d" }}>
					{TUNNEL_CARDS.map((card, i) => (
						<TunnelCard
							key={i}
							card={card}
							progress={smoothProgress}
							pointer={pointer}
							total={TUNNEL_CARDS.length}
							stage={stage}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
