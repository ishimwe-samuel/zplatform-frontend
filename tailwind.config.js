/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      popins: ['"popins"'],
    },
    extend: {
      colors: {
        primary: "#00BFA6",
        lightPrimary: "#BCF0DA",
        reverse: "#000000",
        white: "#ffffff",
        success: "#C3DDFD",
        blue: "#6C63FF",
        lightSuccess: "#C3DDFD",
        lightDanger: "#FBD5D5",
        danger: "#F98080",
        warning: "#f3c891",
      },
    },
  },
  plugins: [],
};
