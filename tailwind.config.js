/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue", "./public/**/*.html"],
  theme: {
    screens: {
      sm: "570px",
      md: "786px",
      lg: "976px",
      x: "1100px",
      xl: "1440px",
      "2xl": "1600px"
    },
    maxWidth: {
      xl: "1440px",
      sm: "300px",
      md: "400px",
      "70": "70%"
    },
    fontFamily: {
      "open-sans": "'Open Sans', sans-serif",
      poppins: "'Poppins', sans-serif",
    },
    extend: {
      colors: {
        "primary-blue": "#0068F0",
        "grey-10": "#EFF5FB",
        "grey-20": "#C7DBEF",
        "grey-30": "#A0C2E4",
        "grey-50": "#508FCE",
        "grey-60": "#3475B7",
        "grey-70": "#285C8F",
        "grey-80": "#1D4267",
        "grey-90": "#122940",
        "red-10": "#DCB0B0",
        "red-30": "#B45454",
        "red-50": "#8F0000",
        "green-10": "#B0DCC4",
        "green-30": "#54B480",
        "green-50": "#008F42",
        // "foundation-blue": "#E6F0FE",
      }
    },
  },
  plugins: [],
}

