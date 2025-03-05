/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Chrome, Safari and Opera */
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },

        ".scrollbar-hidden": {
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      })
    }),
  ],
}