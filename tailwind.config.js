// tailwind.config.js

// Importa as paletas de cores padrão do Tailwind
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Informa ao Tailwind onde ele deve procurar por classes CSS no seu projeto
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  // É aqui que a mágica acontece. Nós definimos o tema.
  theme: {
    // Definimos a paleta de cores que será usada
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Estamos explicitamente dizendo para usar as cores legadas (compatíveis)
      // que importamos acima. Elas usam valores HEX/RGB em vez de oklch().
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      purple: colors.purple,
      green: colors.green,
      red: colors.red,
      // Você pode adicionar outras paletas aqui se precisar (ex: yellow: colors.yellow)
    },
    extend: {},
  },
  plugins: [],
}