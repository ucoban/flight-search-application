/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#60a5fa',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				dark: '#9ca3af',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			surface: {
  				DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
  				dim: 'rgb(var(--color-surface-dim) / <alpha-value>)',
  				bright: 'rgb(var(--color-surface-bright) / <alpha-value>)',
  				container: 'rgb(var(--color-surface-container) / <alpha-value>)',
  				'container-low': 'rgb(var(--color-surface-container-low) / <alpha-value>)',
  				'container-high': 'rgb(var(--color-surface-container-high) / <alpha-value>)'
  			},
  			'on-primary': {
  				DEFAULT: 'rgb(var(--color-on-primary) / <alpha-value>)',
  				container: 'rgb(var(--color-on-primary-container) / <alpha-value>)'
  			},
  			'on-secondary': {
  				DEFAULT: 'rgb(var(--color-on-secondary) / <alpha-value>)',
  				container: 'rgb(var(--color-on-secondary-container) / <alpha-value>)'
  			},
  			'on-surface': {
  				DEFAULT: 'rgb(var(--color-on-surface) / <alpha-value>)',
  				variant: 'rgb(var(--color-on-surface-variant) / <alpha-value>)'
  			},
  			outline: {
  				DEFAULT: 'rgb(var(--color-outline) / <alpha-value>)',
  				variant: 'rgb(var(--color-outline-variant) / <alpha-value>)'
  			},
  			'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
