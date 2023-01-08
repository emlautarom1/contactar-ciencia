/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#1f242c',
          light: '#2b323e',
        },
        primary: {
          medium: '#0a4958',
          light: '#01b6ad'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
