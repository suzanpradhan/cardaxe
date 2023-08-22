/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        110: '28rem',
        120: '32rem',
        125: '34rem',
        130: '36rem',

        140: '40rem',
      },
      width: {
        110: '28rem',
        120: '32rem',
        130: '36rem',
        140: '40rem',
        160: '50rem',
      },
      flexBasis: {
        110: '28rem',
        120: '32rem',
        130: '36rem',
        140: '40rem',
      },
      boxShadow: {
        '3xl': '0px 10px 20px 10px rgba(0, 0, 0, .2)',
      },
      colors: {
        banner: '#878c90',
        input: '#f7f7f7',
        placeholder: '#3a3a3a',
        inputBorder: '#e6e6e6',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
};
