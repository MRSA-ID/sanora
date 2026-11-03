export interface FooterLinkItem {
	title: string;
	link: string | null;
}

export interface FooterSection {
	title: string;
	item: FooterLinkItem[];
}

export const footerContent: FooterSection[] = [
	{
		title: "Location",
		item: [
			{
				title: "Bekasi, Jawa Barat Indonesia",
				link: null,
			},
		],
	},
	{
		title: "Sitemap",
		item: [
			{
				title: "Home",
				link: "#home",
			},
			{
				title: "About",
				link: "#about",
			},
			{
				title: "Project",
				link: "#project",
			},
			{
				title: "Services",
				link: "#services",
			},
			{
				title: "Testimonial",
				link: "#testimonial",
			},
		],
	},
	{
		title: "Socials",
		item: [
			{
				title: "Instagram",
				link: "https://www.instagram.com/snr66._/",
			},
			{
				title: "Dribble",
				link: "https://dribbble.com/MRSA-DR",
			},
			{
				title: "Github",
				link: "https://github.com/MRSA-ID",
			},
			{
				title: "Linkedin",
				link: "https://www.linkedin.com/in/ramadhansa/",
			},
			{
				title: "Youtube",
				link: "https://www.youtube.com/@JEE_ZEEN",
			},
		],
	},
];
