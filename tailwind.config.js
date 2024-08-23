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
    // input: {
    //   label: {
    //     default: {
    //       standard: {
    //         sm: "absolute top-2 z-10 origin-[0] -translate-y-4 scale-75 px-2 text-xs text-primary transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary dark:bg-gray-900 dark:text-primary peer-focus:dark:text-primary",
    //         md: "absolute top-2 z-10 origin-[0] -translate-y-4 scale-75 px-2 text-xs text-primary transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary dark:bg-gray-900 dark:text-primary peer-focus:dark:text-primary",
    //       },
    //     },
    //   },
    // },
  },
  plugins: [flowbite.plugin()],
};
