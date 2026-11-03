import type { ImageMetadata } from "astro";
import Aws from "@assets/logo/aws.svg";
import Bnsp from "@assets/logo/bnsp.svg";
import Cisco from "@assets/logo/cisco.svg";
import Dicoding from "@assets/logo/dicoding.svg";
import Digitalent from "@assets/logo/digitalent.svg";
import Freecodecamp from "@assets/logo/freecodecamp.svg";
import Hacktive8 from "@assets/logo/hacktive8.svg";
import Komdigi from "@assets/logo/komdigi.svg";
import progate from "@assets/logo/progate.svg";
import Shoope from "@assets/logo/shoope.svg";

export interface LogoItem {
	name: string;
	src: ImageMetadata;
}

export const logos: LogoItem[] = [
	{ name: "AWS", src: Aws },
	{ name: "BNSP", src: Bnsp },
	{ name: "Cisco", src: Cisco },
	{ name: "Dicoding", src: Dicoding },
	{ name: "Digitalent", src: Digitalent },
	{ name: "freeCodeCamp", src: Freecodecamp },
	{ name: "Hacktiv8", src: Hacktive8 },
	{ name: "Komdigi", src: Komdigi },
	{ name: "Progate", src: progate },
	{ name: "Shopee", src: Shoope },
];
