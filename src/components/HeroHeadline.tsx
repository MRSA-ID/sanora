// src/components/HeroHeadline.tsx
"use client";

import React, { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";

export default function HeroHeadline() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
		const handlePreloaderComplete = () => {
			setReady(false);
			requestAnimationFrame(() => setReady(true));
		};

		window.addEventListener("preloader-complete", handlePreloaderComplete);
		return () => {
			window.removeEventListener("preloader-complete", handlePreloaderComplete);
		};
	}, []);

	if (!ready) {
		return (
			<div
				className="h-[1.2em] w-full"
				aria-hidden="true"
			/>
		);
	}

	return (
		<LayoutGroup id="hero-headline-group">
			<motion.div
				layout
				className="inline-flex items-center justify-center flex-wrap"
				transition={{ type: "spring", damping: 30, stiffness: 400 }}>
				<motion.span
					layout
					className="whitespace-pre">
					As a{" "}
				</motion.span>
				<TextRotate
					texts={[
						"Frontend Engineer",
						"IT Support",
						"Web Developer",
						"Web Designer",
					]}
					mainClassName="text-sanora-blue-950 py-1.5! rounded-lg justify-center items-center overflow-hidden"
					staggerFrom="last"
					initial={{ y: "100%", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "-120%", opacity: 0 }}
					staggerDuration={0.025}
					splitLevelClassName="overflow-hidden"
					transition={{ type: "spring", damping: 30, stiffness: 400 }}
					rotationInterval={2500}
				/>
			</motion.div>
		</LayoutGroup>
	);
}
