export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Hind Siliguri"', '"Sansation"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        // Dark mode base colors
        'dark-bg': '#0f0f1a',
        'dark-card': '#1a1a2e',
        'dark-card-light': '#16213e',
        'dark-border': 'rgba(99, 102, 241, 0.2)',
        'dark-text': '#f0f0f0',
        'dark-text-secondary': '#a0a0a0',
        // Indigo accent palette
        'indigo': {
          50: '#f0f4ff',
          100: '#c7d2fe',
          200: '#a5b4fc',
          300: '#818cf8',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'spin-indigo': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'spin-indigo': 'spin-indigo 1s linear infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.2)',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      }
    },
  },
  plugins: [],
}
