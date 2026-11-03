import type { ImageMetadata } from "astro";
import GreenEye from "@assets/gif/green_eye.gif";
import YellowEye from "@assets/gif/yellow-eye.gif";
import RedEye from "@assets/gif/red-eye.gif";
import GreenEyeOld from "@assets/gif/green-old-eye.gif";
import BlackEye from "@assets/gif/black-eye.gif";
import BlueEye from "@assets/gif/blue-eye.gif";

export interface TestimonialItem {
	quote: string;
	author: string;
	gif: ImageMetadata;
	bgColor: string;
	imageClass: string;
}

export const testimonials: TestimonialItem[] = [
	{
		quote:
			"Fast learner and can quickly adapt to our system and especially our company works in the maps application.",
		author: "Ahmad Rayis, Circlegeo",
		gif: GreenEye,
		bgColor: "#6fd955",
		imageClass: "object-[50%_80%]",
	},
	{
		quote:
			"A full-stack web developer with strong UI/UX instincts, skilled at turning complex requirements into clean, high-performing web solutions.",
		author: "Gema Aditya Mahendra, Exalter Students",
		gif: YellowEye,
		bgColor: "#f5b82e",
		imageClass: "object-[50%_80%]",
	},
	{
		quote: "Great work, clean code and good personality",
		author: "Lulu Maulana Malik, Circlegeo",
		gif: RedEye,
		bgColor: "#f8563f",
		imageClass: "object-[50%_75%]",
	},
	{
		quote:
			"Can work with challenges, proven that the tasks he takes are always heavy tasks.",
		author: "Naufal Yukafi Ridlo, Freelance",
		gif: GreenEyeOld,
		bgColor: "#26694e",
		imageClass: "object-[50%_80%]",
	},
	{
		quote:
			"An exceptional front-end developer and collaborative problem-solver who consistently delivers creative solutions in team pairing.",
		author: "Aldycky Bagus Widjaksana, SUPERSPRING",
		gif: BlackEye,
		bgColor: "#0a0b0d",
		imageClass: "scale-150 origin-[50%_80%]",
	},
	{
		quote:
			"A skilled front-end developer who transforms UI/UX designs into high-performing web apps, driving seamless user experiences and faster product delivery.",
		author: "Ageng Permadi, EBP",
		gif: BlueEye,
		bgColor: "#5c86f8",
		imageClass: "scale-150 origin-[50%_80%]",
	},
];
