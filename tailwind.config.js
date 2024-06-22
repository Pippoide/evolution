

/** @type {import('tailwindcss').Config} */


module.exports = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary": "#194219",
      "primary-light": "#778c2a",
      "secondary": "#f4ead7",
      "third": "#272823",
      "black-opacity": "rgba(0,0,0,0.5)"

    },
    extend: {
      aspectRatio: {
        '4/5': '4 / 5'
      },
      fontFamily: {
        alfa: ['var(--font-alfa)', 'sans-serif'],
        rubik: ['var(--font-rubik)', 'sans-serif'],
        custom: ['typewriter', 'sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
