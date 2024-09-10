import type { Config } from "tailwindcss";
import { createVariableScale } from "./src/utils/theming";

export default {
	content: ["./{app,src}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		colors: {
			current: "currentColor",
			main: createVariableScale("main", 12),
			primary: createVariableScale("primary", 12),
			secondary: createVariableScale("secondary", 12),
		},
		borderRadius: {
			0: "0",
			xs: "1px",
			sm: "4px",
			md: "8px",
			lg: "12px",
			xl: "16px",
			xxl: "24px",
		},
		padding: {
			0: "0px",
			1: "2px",
			2: "4px",
			3: "6px",
			4: "12px",
			5: "16px",
			6: "24px",
		},
		borderWidth: {
			0: "0px",
			1: "1px",
			2: "2px",
			3: "3px",
			4: "4px",
			5: "6px",
			6: "8px",
		},
	},
	plugins: [],
} satisfies Config;
