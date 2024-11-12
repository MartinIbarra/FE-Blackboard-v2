import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
    colors: {
      primary: "#DC5F00",
      secondary: "#4F4A45",
    },
  },
  plugins: [flowbite.plugin()],
};
