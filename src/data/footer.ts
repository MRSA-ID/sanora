import { defaultMenuItems } from "@/data/navigation";
import { allSocials } from "@/data/socials";

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
		item: defaultMenuItems.map((nav) => ({
			title: nav.label,
			link: `#${nav.targetId}`,
		})),
	},
	{
		title: "Socials",
		item: allSocials.map((social) => ({
			title: social.label,
			link: social.href,
		})),
	},
];
