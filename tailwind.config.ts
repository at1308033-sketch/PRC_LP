/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Đỏ Phan Rang" palette — sampled from the project KV, logo and facade renders
        paper: '#FBF8F3',
        'warm-white': '#F3EDE4', // warm sand: page background, text on dark
        'off-white': '#EAE1D3', // deeper sand: alternating sections
        charcoal: '#1E1A17', // warm ink
        'concrete': '#6A5F57', // warm grey-brown body text (5.3:1 on sand)
        'concrete-light': '#A39787',
        wood: '#907860', // facade timber tone from renders
        gold: '#D8C078', // logo gold — logo/brand marks only, never UI fills
        // Brand crimson from the KV — structural colour (CTA, eyebrows, bands)
        accent: {
          DEFAULT: '#7A1414',
          light: '#F1DCD6',
          dark: '#5A0E0E',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Latin/digits only — see layout.tsx
        hand: ['var(--font-hand)', 'cursive'],
        signature: ['var(--font-signature)', 'cursive'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3' }],
        'heading-md': ['1.25rem', { lineHeight: '1.35' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.07)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) infinite linear',
      },
      transitionDuration: {
        'slow': '400ms',
        'arch': '600ms',
      },
      transitionTimingFunction: {
        'arch': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}