
const flowbite = require("flowbite-react/tailwind");
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateRows: {
        'layout': 'auto 1fr' ,
        'layout2': '1fr auto',
        'layout3': 'auto auto',
        'layout4': '70% 30%'
      },
      gridTemplateColumns : {
        'layout' : "30% 70%",
        'layout4' : "70% 30%  ",
        'layout2': "1fr 1fr",
        'layout3' : "20% 60% 20%",

      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          "900" : "#03045E",
          "800" : "#023E8A",
          "700" : "#0077B6",
          "600" : "#0096C7",
          "500" : "#00B4D8",
          "400" : "#48CAE4",
          "300" : "#90E0EF",
          "200" : "#ADE8F4",
          "100" : "#CAF0F8",
          "50" : "#E0F7FA",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          1 : '#14213d',
          2 : '#0d1b2a',
          3 : '#1b263b',
          4 : '#415a77',
          5 : '#778da9',
          6 : '#e0e1dd',
          7 : '#222222',
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        forth : {
          start : '#6F7DFF',
          end : '#7B88FF',
          flowbite : "#155E75"

        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin(), 'prettier-plugin-tailwindcss'],
}

