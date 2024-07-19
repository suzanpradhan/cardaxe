import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ["class"],

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'gap-y-2',
    'gap-x-2',
    'text-start',
    'aspect-rectangle ',

    'rounded-lg',
    'p-3',
    'mb-10',
    'bg-slate-800',
    'flex',
    'flex-col',
    'justify-between',
    'h-full',
    'grid',
    'grid-cols-12',
    'place-content-center',
    'col-span-9',
    'text-xl',
    'font-bold',
    'text-green-500',
    'font-medium',
    'col-span-3',
    'w-full',
    'h-auto',
    '-z-10',
    'object-contain',
    'items-stretch',
    'font-normal',
    'text-sm',
    'text-black/75',
    'gap-1',
    'min-h-card',
    'aspect-businessCard',
    'text-fluid'
  ],
  prefix: '',
  theme: {
    screens: {
      xs: "540px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      aspectRatio: {
        rectangle: '9/4',
        businessCard: '7 / 4',
      },
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
        fitAll: '40rem',
        card: '15rem',
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
        inputBgGrey: '#f7f7f7',
        inputPlaceholder: '#7e858f',
        borderMain: '#d1d5db',
        componentBgGrey: '#e6e6e6',
        inputDisabled: '#e6e6e6',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      borderWidth: {
        1: '1px',
      },
      gridTemplateColumns: {
        'dashboard-layout-fullscreen': 'minmax(175px, 1fr) minmax(300px, 5fr)',
        'home-layout': 'minmax(200px, 55%) minmax(0px, 45%)',
        'table-grid': '35% 10% 20% 15% 20%',
      },
      maxHeight: {
        120: '36rem',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        'xs-mobile': ['10px', '15px'],
        'sm-mobile': ['12px', '17px'],
        'base-mobile': ['14px', '20px'],
        'lg-mobile': ['18px', '24px'],
        'xl-mobile': ['22px', '30px'],
        '2xl-mobile': ['26px', '34px'],
        '3xl-mobile': ['30px', '38px'],
        '4xl-mobile': ['34px', '42px'],
        'fluid': 'clamp(.5rem, 5vw, 2.5rem)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries'),],
} satisfies Config;

export default config

