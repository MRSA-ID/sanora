// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	// Explicitly target Static Site Generation (SSG / Static HTML)
	output: "static",

	// Production Site domain for canonical & OG absolute URLs
	site: "https://www.sanora-dev.me/",

	// HTML output minification & asset optimization
	compressHTML: true,

	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],

		build: {
			// Minify JS using terser for smaller bundle sizes
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true, // Strips console.log calls in production
					drop_debugger: true,
				},
			},

			// Inline assets smaller than 4KB as base64 to save HTTP requests
			assetsInlineLimit: 4096,

			rollupOptions: {
				output: {
					// Separate heavy 3D and animation libraries into vendor chunks
					manualChunks(id) {
						if (id.includes("node_modules")) {
							if (id.includes("three") || id.includes("three-stdlib")) {
								return "vendor-three";
							}
							if (
								id.includes("@react-three") ||
								id.includes("shadergradient") ||
								id.includes("@shadergradient") ||
								id.includes("ogl") ||
								id.includes("camera-controls")
							) {
								return "vendor-3d-tools";
							}
							if (
								id.includes("gsap") ||
								id.includes("lenis") ||
								id.includes("motion")
							) {
								return "vendor-animation";
							}
							if (id.includes("react") || id.includes("react-dom")) {
								return "vendor-core";
							}
						}
					},
				},
			},
		},

		// Prevent bundling duplicate webgl/three dependencies
		optimizeDeps: {
			include: ["three", "gsap", "ogl", "lenis"],
		},
	},
});
