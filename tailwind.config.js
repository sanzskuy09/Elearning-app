/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./template/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // purge: [
  //   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./app/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./template/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#727272",
        tersier: "#0FA958",
        title: "#0D99FF",
        // background: "#EFEFEF",
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
