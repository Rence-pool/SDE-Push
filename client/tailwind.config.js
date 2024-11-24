/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindScroollbarDaisyui from "tailwind-scrollbar-daisyui";
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground":
						"hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground":
						"hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
		},
	},
	daisyui: {
		themes: [
			{
				customTheme: {
					primary: "#002B4E", // Deep navy blue - matches the header/background
					secondary: "#FFD700", // Gold - for the "Your Cart" text and highlights
					accent: "#FFFFFF", // White - for text and icons
					neutral: "#E8E8E8", // Light gray - for borders and separators
					"base-100": "#FFFFFF", // White - for content background
					"neutral-focus": "#4A4A4A",
					"base-200": "#F5F5F5",
					"base-300": "#003A69", // Slightly lighter navy for hover states
					success: "#28A745", // Green for success messages
					warning: "#FFC107", // Amber for warnings
					error: "#DC3545", // Red for errors
					info: "#17A2B8", // Blue for information
					// Custom additions
					"primary-dark": "#001F3A", // Darker navy for footer
					"text-primary": "#FFFFFF", // White text
					"button-primary": "#FFD700", // Gold for primary buttons
					"button-text": "#002B4E", // Navy for button text
				},
			},
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
			"dim",
			"nord",
			"sunset",
		],
	},
	plugins: [daisyui, tailwindcssAnimate, tailwindScroollbarDaisyui],
};
