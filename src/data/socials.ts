export interface SocialItem {
	label: string;
	href: string;
}

export const allSocials: SocialItem[] = [
	{ label: "Instagram", href: "https://www.instagram.com/snr66._/" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/ramadhansa/" },
	{ label: "GitHub", href: "https://github.com/MRSA-ID" },
	{ label: "Dribbble", href: "https://dribbble.com/MRSA-DR" },
	{ label: "YouTube", href: "https://www.youtube.com/@JEE_ZEEN" },
];

// Slice the top 3 items specifically for the floating menu layout
export const menuSocials: SocialItem[] = allSocials.slice(0, 3);
