/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#0067FF',
        primaryDark: '#0053cc',
        yellowColor: '#FEB60D',
        purpleColor: '#9771FF',
        irisBlueColor: '#01B5C5',
        headingColor: '#181A1E',
        textColor: '#4E545F',
        glassBg: 'rgba(255, 255, 255, 0.85)',
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        cardGlow: "0 10px 30px -5px rgba(0, 103, 255, 0.15)",
        cardHover: "0 20px 40px -10px rgba(0, 103, 255, 0.2)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        fadeIn: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideUp: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideDown: 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        floatSlow: 'floatSlow 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 103, 255, 0.4)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(0, 103, 255, 0.2)' },
        },
      }
    },
  },
  plugins: [],
}
