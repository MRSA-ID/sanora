export interface MenuItem {
	label: string;
	targetId: string;
}

export const defaultMenuItems: MenuItem[] = [
	{ label: "Home", targetId: "hero-container" },
	{ label: "About", targetId: "about-container" },
	{ label: "Project", targetId: "project-container" },
	{ label: "Services", targetId: "services-container" },
	{ label: "Contribute", targetId: "contribute-container" },
	{ label: "People Say", targetId: "testimoni-container" },
];
