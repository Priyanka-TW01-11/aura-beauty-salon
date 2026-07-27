/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFBF6',
        blush: '#F7DCE2',
        blushdark: '#F0C3CE',
        rose: '#B76E79',
        rosedark: '#96525D',
        plum: '#5E2436',
        plumdark: '#3E1826',
        gold: '#C6A15B',
        goldlight: '#E4C98A',
        ink: '#2B211F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(94, 36, 54, 0.25)',
        gold: '0 0 0 1px rgba(198,161,91,0.4)',
      },
      keyframes: {
        draw: { to: { strokeDashoffset: 0 } },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
