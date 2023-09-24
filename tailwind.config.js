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
      minHeight: {
        fitall: '40rem',
      },
      flexBasis: {
        110: '28rem',
        120: '32rem',
        130: '36rem',
        140: '40rem',
        160: '50rem',
      },
      boxShadow: {
        '3xl': '0px 10px 20px 10px rgba(0, 0, 0, .2)',
      },
      colors: {
        redError: '#dd373a',
        blueBg: '#bfdbfe',
        blueTheme: '#2563eb',
        grayfont: '#7e858f',
        banner: '#878c90',
        // input: '#f7f7f7',
        inputBgGrey: '#f7f7f7',
        inputPlaceholder: '#3a3a3a',
        // placeholder: '#3a3a3a',
        // inputBorder: '#e6e6e6',
        borderMain: '#d1d5db',
        componentBgGrey: '#e6e6e6',
        inputDisabled: '#e6e6e6',
      },
      borderWidth: {
        1: '1px',
      },
      gridTemplateColumns: {
        'dashboard-layout': '20% 80%',
        'home-layout': '55% 45%',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
};
