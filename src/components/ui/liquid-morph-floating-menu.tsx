// src/components/ui/liquid-morph-floating-menu.tsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { MenuToggle } from "./menu-toggle";

const ease = [0.22, 1, 0.36, 1] as const;
const slowEase = [0.16, 1, 0.3, 1] as const;

export interface MenuItem {
	label: string;
	onClick?: () => void;
	href?: string;
}

export interface SocialItem {
	label: string;
	href: string;
}

interface FloatingMenuProps {
	items?: MenuItem[];
	socials?: SocialItem[];
}

function MenuButton({
	label,
	onClick,
	isOpen,
	index,
}: {
	label: string;
	onClick?: () => void;
	isOpen: boolean;
	index: number;
}) {
	const [hovered, setHovered] = useState(false);
	const animatingRef = useRef(false);
	const pendingLeaveRef = useRef(false);
	const chars = label.split("");
	const lockDuration = 30 * chars.length + 300;

	const handleEnter = useCallback(() => {
		pendingLeaveRef.current = false;
		if (hovered) return;
		setHovered(true);
		animatingRef.current = true;
		setTimeout(() => {
			animatingRef.current = false;
			if (pendingLeaveRef.current) {
				pendingLeaveRef.current = false;
				setHovered(false);
			}
		}, lockDuration);
	}, [hovered, lockDuration]);

	const handleLeave = useCallback(() => {
		if (animatingRef.current) {
			pendingLeaveRef.current = true;
		} else {
			setHovered(false);
		}
	}, []);

	return (
		<motion.button
			onClick={onClick}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			className="text-sanora-neutral-50 leading-none cursor-pointer text-left w-max block"
			style={{
				fontFamily: "var(--font-montreal), sans-serif",
				letterSpacing: "-0.03em",
			}}>
			<div className="flex justify-start items-center w-max">
				{chars.map((char, i) => (
					<motion.span
						key={i}
						className="inline-block overflow-hidden text-[28px] md:text-[32px] font-medium leading-[1.1]"
						style={{ height: "1.1em" }}
						initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
						animate={{
							opacity: isOpen ? 1 : 0,
							y: isOpen ? 0 : 16,
							filter: isOpen ? "blur(0px)" : "blur(8px)",
						}}
						transition={{
							duration: 0.75,
							delay: isOpen ? 0.45 + 0.08 * index + 0.035 * i : 0,
							ease: slowEase,
						}}>
						<span
							className="flex flex-col"
							style={{
								transitionProperty: "transform",
								transitionDuration: hovered ? "800ms" : "0ms",
								transitionDelay: hovered ? `${30 * i}ms` : "0ms",
								transform: hovered ? "translateY(-50%)" : "translateY(0%)",
								transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
							}}>
							<span
								className="block text-left"
								style={{ height: "1.1em", lineHeight: "1.1em" }}>
								{char === " " ? "\u00A0" : char}
							</span>
							<span
								className="block text-left"
								style={{ height: "1.1em", lineHeight: "1.1em" }}
								aria-hidden>
								{char === " " ? "\u00A0" : char}
							</span>
						</span>
					</motion.span>
				))}
			</div>
		</motion.button>
	);
}

function SocialLink({
	label,
	href,
	isOpen,
	index,
}: {
	label: string;
	href: string;
	isOpen: boolean;
	index: number;
}) {
	const [hovered, setHovered] = useState(false);
	const animatingRef = useRef(false);
	const pendingLeaveRef = useRef(false);
	const chars = label.split("");
	const lockDuration = 30 * chars.length + 300;

	const handleEnter = useCallback(() => {
		pendingLeaveRef.current = false;
		if (hovered) return;
		setHovered(true);
		animatingRef.current = true;
		setTimeout(() => {
			animatingRef.current = false;
			if (pendingLeaveRef.current) {
				pendingLeaveRef.current = false;
				setHovered(false);
			}
		}, lockDuration);
	}, [hovered, lockDuration]);

	const handleLeave = useCallback(() => {
		if (animatingRef.current) {
			pendingLeaveRef.current = true;
		} else {
			setHovered(false);
		}
	}, []);

	return (
		<motion.a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			className="text-sanora-neutral-50! leading-none cursor-pointer inline-block"
			style={{
				fontFamily: "var(--font-montreal), sans-serif",
				letterSpacing: "-0.02em",
			}}>
			<div className="flex justify-start items-center">
				{chars.map((char, i) => (
					<motion.span
						key={i}
						className="inline-block overflow-hidden text-[13px] md:text-[14px] font-normal leading-[1.1]"
						style={{ height: "1.1em" }}
						initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
						animate={{
							opacity: isOpen ? 1 : 0,
							y: isOpen ? 0 : 12,
							filter: isOpen ? "blur(0px)" : "blur(6px)",
						}}
						transition={{
							duration: 0.65,
							delay: isOpen ? 0.8 + 0.06 * index + 0.03 * i : 0,
							ease: slowEase,
						}}>
						<span
							className="flex flex-col"
							style={{
								transitionProperty: "transform",
								transitionDuration: hovered ? "800ms" : "0ms",
								transitionDelay: hovered ? `${30 * i}ms` : "0ms",
								transform: hovered ? "translateY(-50%)" : "translateY(0%)",
								transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
							}}>
							<span
								className="block text-left"
								style={{ height: "1.1em", lineHeight: "1.1em" }}>
								{char === " " ? "\u00A0" : char}
							</span>
							<span
								className="block text-left"
								style={{ height: "1.1em", lineHeight: "1.1em" }}
								aria-hidden>
								{char === " " ? "\u00A0" : char}
							</span>
						</span>
					</motion.span>
				))}
			</div>
		</motion.a>
	);
}

export default function FloatingMenu({ items, socials }: FloatingMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const menuItems: MenuItem[] = items ?? [
		{
			label: "Home",
			onClick: () => {
				document
					.getElementById("hero-container")
					?.scrollIntoView({ behavior: "smooth" });
			},
		},
		{ label: "About" },
		{ label: "Project" },
		{ label: "Services" },
		{ label: "People Say" },
	];

	const socialItems: SocialItem[] = socials ?? [
		{ label: "Instagram", href: "https://www.instagram.com/snr66._/" },
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/ramadhansa/" },
		{ label: "GitHub", href: "https://github.com/MRSA-ID" },
	];

	// Close on outside click
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [isOpen]);

	return (
		<motion.div
			ref={containerRef}
			className="fixed top-4 left-1/2 z-[100]"
			style={{ x: "-50%", pointerEvents: "auto" }}
			initial={{ opacity: 0, y: -32, filter: "blur(12px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{ duration: 1.4, delay: 0.6, ease: slowEase }}>
			<motion.div
				className="relative overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl"
				onClick={() => {
					if (!isOpen) setIsOpen(true);
				}}
				style={{
					fontFamily: "var(--font-montreal), sans-serif",
					letterSpacing: "-0.02em",
					cursor: isOpen ? "default" : "pointer",
				}}
				animate={{
					width: isOpen ? 320 : 232,
					height: isOpen ? 420 : 52,
					borderRadius: 12,
					scale: 1,
				}}
				whileHover={isOpen ? undefined : { scale: 1.05 }}
				transition={{
					duration: 0.8,
					ease,
					height: { duration: isOpen ? 0.8 : 0.4, ease },
					width: { duration: isOpen ? 0.8 : 0.4, ease },
					scale: { duration: 0.25, ease },
				}}>
				{/* Neutral-50 background layer */}
				<motion.div
					className="absolute inset-0 bg-sanora-neutral-50 border border-sanora-blue-950/5"
					animate={{
						borderColor: isOpen
							? "rgba(1, 41, 176, 0.4)"
							: "rgba(1, 41, 176, 0.2)",
					}}
					transition={{ duration: isOpen ? 0.1 : 0.3, ease }}
					style={{
						borderRadius: "inherit",
					}}
				/>

				{/* Header bar (Top Trigger) */}
				<motion.div
					className="relative z-10 flex items-center justify-between w-full shrink-0 cursor-pointer"
					onClick={() => setIsOpen((prev) => !prev)}
					animate={{
						paddingLeft: isOpen ? 24 : 20,
						paddingRight: isOpen ? 24 : 20,
						height: 52,
					}}
					transition={{ duration: 0.8, ease }}
					style={{ alignItems: "center" }}>
					<motion.span
						className="text-[14px] md:text-[24px] font-medium leading-none tracking-wider select-none"
						animate={{ color: isOpen ? "#fafaf8" : "#0129b0" }}
						transition={{ duration: 0.3, ease }}>
						Sanora
					</motion.span>

					{/* Integrated MenuToggle Component */}
					<div className="relative z-20 flex items-center justify-center">
						<MenuToggle
							open={isOpen}
							strokeWidth={2.5}
							stroke={isOpen ? "#fafaf8" : "#0129b0"}
							className="size-6 transition-colors duration-300"
						/>
					</div>
				</motion.div>

				{/* Blue-950 circle expanding from TOP downwards with Backdrop Blur */}
				<motion.div
					className="absolute left-1/2 bg-sanora-blue-950/90 backdrop-blur-xl backdrop-saturate-150 pointer-events-none"
					style={{
						width: "300%",
						height: "300%",
						borderRadius: "50%",
						x: "-50%",
					}}
					animate={{ top: isOpen ? "-50%" : "-300%" }}
					transition={{
						duration: 0.8,
						ease,
						delay: isOpen ? 0.1 : 0,
					}}
				/>

				{/* Menu items list */}
				<motion.div
					className="relative z-10 flex flex-col justify-between items-start gap-4 px-6! pb-6! w-full flex-1"
					animate={{
						opacity: isOpen ? 1 : 0,
					}}
					transition={{ duration: isOpen ? 0.4 : 0.15 }}
					style={{
						pointerEvents: isOpen ? "auto" : "none",
					}}>
					<div className="flex flex-col gap-4 items-start w-full">
						<motion.hr
							className="border-[0.5] border-sanora-blue-450 w-full mt-2!"
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{
								opacity: isOpen ? 1 : 0,
								scaleX: isOpen ? 1 : 0,
							}}
							transition={{
								duration: 0.6,
								delay: isOpen ? 0.35 : 0,
								ease: slowEase,
							}}
							style={{ originX: 0 }}
						/>
						{menuItems.map((item, idx) => (
							<MenuButton
								key={item.label}
								label={item.label}
								onClick={() => {
									item.onClick?.();
									setIsOpen(false);
								}}
								isOpen={isOpen}
								index={idx}
							/>
						))}
					</div>

					{/* Social Links Row */}
					<div className="flex flex-col gap-2 w-full pt-3! ">
						<motion.hr
							className="border-[0.5] border-sanora-blue-450 w-full mt-2!"
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{
								opacity: isOpen ? 1 : 0,
								scaleX: isOpen ? 1 : 0,
							}}
							transition={{
								duration: 0.6,
								delay: isOpen ? 0.35 : 0,
								ease: slowEase,
							}}
							style={{ originX: 0 }}
						/>
						<div className="flex items-center justify-between w-full">
							{socialItems.map((soc, idx) => (
								<SocialLink
									key={soc.label}
									label={soc.label}
									href={soc.href}
									isOpen={isOpen}
									index={idx}
								/>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
