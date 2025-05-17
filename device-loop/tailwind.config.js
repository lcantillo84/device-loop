// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",     // Leaf green
        secondary: "#A3B18A",   // Soft sage
        accent: "#DAD7CD",      // Light neutral
        background: "#FAF9F6",  // Warm white
        surface: "#F5F5DC",     // Card panels
        text: "#2D2D2D",        // Deep readable gray
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        deviceloop: {
          "primary": "#4CAF50",     // CTA / buttons / highlights
          "secondary": "#A3B18A",   // Subtle contrast
          "accent": "#DAD7CD",      // Accent lines, links
          "neutral": "#F5F5DC",     // Card backgrounds
          "base-100": "#FAF9F6",    // Page background
          "info": "#3B82F6",
          "success": "#4CAF50",
          "warning": "#ED8936",
          "error": "#E53E3E",
        },
      },
    ],
    darkTheme: "deviceloop",
  },
};
