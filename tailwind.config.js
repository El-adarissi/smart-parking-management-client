import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // All React component files in src folder
  "./index.html", // Main HTML file in the public folder
  flowbite.content(),
];
export const theme = {
  extend: {
    colors: {
      neutralSilver: "#F5F7FA",
      neutralDGrey: "#4D4D4D",
      brandPrimary: "#4CAF4F",
      neutralGrey: "#F5F7FA",
      gray900: "#18191F",
      sidebar: "#1E293B", 
      sidebarHover: "#3B82F6", 
    },
  },
};
export const plugins = [flowbite.plugin()];
