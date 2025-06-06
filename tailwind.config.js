/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          light: '#FF8A65',
          dark: '#E5532A'
        },
        secondary: {
          DEFAULT: '#2E3A46',
          light: '#3B4B5C',
          dark: '#1F2937'
        },
        accent: '#00D4AA',
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'neu-light': '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff',
        'neu-dark': '20px 20px 60px #1a1a1a, -20px -20px 60px #2e2e2e'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}