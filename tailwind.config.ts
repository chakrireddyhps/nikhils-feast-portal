import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0B0A',
        surface: '#1C1412',
        'surface-el': '#251A17',
        'surface-hov': '#2C1F1B',
        burgundy: '#9B2335',
        'burgundy-light': '#C0272D',
        gold: '#C9A84C',
        'gold-light': '#E2C76B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontOpticalSizing: { auto: 'auto' },
    },
  },
  plugins: [],
}
export default config
