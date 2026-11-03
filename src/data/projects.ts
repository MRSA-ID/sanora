import type { ImageMetadata } from "astro";

import galedi_image_1 from "@assets/projects/galedicorps/1.png";
import galedi_image_2 from "@assets/projects/galedicorps/2.png";
import galedi_image_3 from "@assets/projects/galedicorps/3.png";
import kplp_image_1 from "@assets/projects/kplp/1.png";
import kplp_image_2 from "@assets/projects/kplp/2.png";
import kplp_image_3 from "@assets/projects/kplp/3.png";
import arkaloka_image_1 from "@assets/projects/arkaloka/1.png";
import arkaloka_image_2 from "@assets/projects/arkaloka/2.png";
import bomberpest_image_1 from "@assets/projects/bomberpest/1.png";
import bomberpest_image_2 from "@assets/projects/bomberpest/2.png";
import bomberpest_image_3 from "@assets/projects/bomberpest/3.png";
import tamarin_image_1 from "@assets/projects/tamarin/1.png";
import tamarin_image_2 from "@assets/projects/tamarin/2.png";
import tamarin_image_3 from "@assets/projects/tamarin/3.png";
import qwerty_image_1 from "@assets/projects/qwerty/1.png";
import qwerty_image_2 from "@assets/projects/qwerty/2.png";
import qwerty_image_3 from "@assets/projects/qwerty/3.png";
import iru_image_1 from "@assets/projects/iru/1.png";
import iru_image_2 from "@assets/projects/iru/2.png";
import iru_image_3 from "@assets/projects/iru/3.png";
import kemayu_image_1 from "@assets/projects/kemayu/1.png";
import kemayu_image_2 from "@assets/projects/kemayu/2.png";
import exalter_image_1 from "@assets/projects/exalter/1.png";
import exalter_image_2 from "@assets/projects/exalter/2.png";
import exalter_image_3 from "@assets/projects/exalter/3.png";
import inventify_image_1 from "@assets/projects/inventify/1.png";
import codementor_image_1 from "@assets/projects/codementor/1.png";
import ebp_image_1 from "@assets/projects/ebp/1.png";
import bfarm_image_1 from "@assets/projects/bfarm/1.png";
import shopsun_image_1 from "@assets/projects/shopsun/1.png";
import shopsun_image_2 from "@assets/projects/shopsun/2.png";
import circlegeo_image_1 from "@assets/projects/circlegeo/1.png";

export interface ProjectItem {
	id: string;
	name: string;
	category: string;
	client: string;
	year: string;
	description: string;
	url: string;
	images: ImageMetadata[];
}

export const projectsData: ProjectItem[] = [
	{
		id: "project-1",
		name: "Holding company Ecosystem",
		category: "Web Design, Development",
		client: "Galedicorps",
		year: "2026",
		description:
			"Galedi Corps is an enterprise corporate holding group in Indonesia overseeing 10 commercial brands and 3 digital media platforms across 4 strategic business units (SBUs): Fragrance & Wellness, Travel & Hospitality, Experiential Events & Industrial Packaging, and Human Capital Consulting",
		url: "https://www.galedicorps.com/",
		images: [galedi_image_1, galedi_image_2, galedi_image_3],
	},
	{
		id: "project-2",
		name: "AI-Powered Event Visual Production",
		category: "AI Video Generation",
		client: "KPLP",
		year: "2026",
		description:
			"A generative AI video production combining prompt engineering, AI-assisted visual generation, cinematic sequencing, and post-production to create an immersive opening experience for KPLP's 2026 Technical Working Meeting.",
		url: "none",
		images: [kplp_image_1, kplp_image_2, kplp_image_3],
	},
	{
		id: "project-3",
		name: "Hospitality Website",
		category: "Web Design",
		client: "Arkaloka Hospitality",
		year: "2026",
		description:
			"Designed the official UI/UX web concept for Arkaloka Hospitality, a forward-thinking Indonesian hospitality group introducing the concept of Neosantara—reimagining Indonesian heritage through contemporary design, mindful living, and modern digital experiences.",
		url: "none",
		images: [arkaloka_image_1, arkaloka_image_2],
	},
	{
		id: "project-4",
		name: "Pest Control Solutions Page",
		category: "Web Design, Development",
		client: "Bomberpest",
		year: "2026",
		description:
			"Designing and developing a digital presence for BomberPest, bringing together visual clarity, intuitive navigation, and responsive frontend implementation to create a professional online experience.",
		url: "https://www.bomberpest.com/",
		images: [bomberpest_image_1, bomberpest_image_2, bomberpest_image_3],
	},
	{
		id: "project-5",
		name: "Digital Experience Design & Development",
		category: "Web Design, Development",
		client: "Tamarin Hotel Jakarta",
		year: "2026",
		description:
			"A complete redesign and development of Tamarin Hotel Jakarta's digital presence, combining refined visual design, immersive hospitality imagery, and intuitive interactions to create a seamless online experience for discovering the hotel's rooms, dining, facilities, and event spaces.",
		url: "https://tamarinhoteljakarta.com/",
		images: [tamarin_image_1, tamarin_image_2, tamarin_image_3],
	},
	{
		id: "project-6",
		name: "Qwerty Service Landing Page",
		category: "Web Design, Development",
		client: "Qwerty Service",
		year: "2025",
		description:
			"A digital presence designed and developed for Qwerty Service, presenting its technology solutions through a professional interface, Built to strengthen brand credibility and make technology services more accessible to potential customers.",
		url: "https://qwerty-service.vercel.app/",
		images: [qwerty_image_1, qwerty_image_2, qwerty_image_3],
	},
	{
		id: "project-7",
		name: "Corporate Website Design & Development",
		category: "Web Design, Development",
		client: "PT. Indo Rezky Utama (IRU)",
		year: "2025",
		description:
			"A corporate website designed and developed to establish PT. Indo Rezky Utama's digital presence and strengthen its credibility in the international charcoal briquette market.",
		url: "https://iru-beta.vercel.app/",
		images: [iru_image_1, iru_image_2, iru_image_3],
	},
	{
		id: "project-8",
		name: "PO System Web Application",
		category: "Development",
		client: "Ayam Geprek Kemayu",
		year: "2025",
		description:
			"A custom online ordering platform for Kemayu, designed to simplify product purchases and centralize order management. Featuring QRIS and bank transfer payment options with manual transaction verification, the system gives the owner control over payment confirmation before orders proceed to fulfillment.",
		url: "https://po-system-mocha.vercel.app/",
		images: [kemayu_image_1, kemayu_image_2],
	},
	{
		id: "project-9",
		name: "Exalter Students Platform",
		category: "Web Design, Development",
		client: "Exalter Students",
		year: "2024",
		description:
			"A modern web application empowering the next generation of leaders to excel in academics, career building, and personal development.",
		url: "https://exalter-ten.vercel.app/",
		images: [exalter_image_1, exalter_image_2, exalter_image_3],
	},
	{
		id: "project-10",
		name: "Inventify Center Landing Page",
		category: "Web Design, Development",
		client: "Exalter Students",
		year: "2024",
		description:
			"A global digital platform empowering young visionaries through incubation, workshops, and international competitions to turn innovative ideas into reality.",
		url: "https://inventify-center.vercel.app/",
		images: [inventify_image_1],
	},
	{
		id: "project-11",
		name: "Alpaca Image Generator",
		category: "Development, Case Studies",
		client: "Codementor",
		year: "2024",
		description:
			"A global digital platform empowering young visionaries through incubation, workshops, and international competitions to turn innovative ideas into reality.",
		url: "https://alpaca-images-generator.vercel.app/",
		images: [codementor_image_1],
	},
	{
		id: "project-12",
		name: "Landing Page EBP",
		category: "Development",
		client: "PT Empat Beruang Perkasa",
		year: "2023",
		description:
			"A complete UI/UX landing page redesign for PT Empat Beruang Perkasa, modernizing their corporate digital presence for enhanced client engagement and brand credibility",
		url: "https://ebp.co.id/",
		images: [ebp_image_1],
	},
	{
		id: "project-13",
		name: "bFarm Landing Page",
		category: "Development",
		client: "PT Empat Beruang Perkasa",
		year: "2023",
		description:
			"A complete UI/UX landing page redesign for BFarm, translating their agricultural brand into a modern, high-performance digital experience",
		url: "https://ebp.co.id/",
		images: [bfarm_image_1],
	},
	{
		id: "project-14",
		name: "Ecommerce Project",
		category: "Development, Case Studies",
		client: "Hacktive8",
		year: "2021",
		description:
			"An interactive e-commerce web application that integrates the FakeStoreAPI to provide a real-time experience for exploring and managing a product catalog.",
		url: "https://shopsun-commerce.netlify.app/",
		images: [shopsun_image_1, shopsun_image_2],
	},
	{
		id: "project-15",
		name: "Circlegeo design",
		category: "Web Design",
		client: "Circlegeo",
		year: "2021",
		description:
			"UI/UX design for the CircleGeo company profile, created in Figma using a precise responsive layout approach tailored for Desktop, Tablet, and Android displays.",
		url: "none",
		images: [circlegeo_image_1],
	},
];
