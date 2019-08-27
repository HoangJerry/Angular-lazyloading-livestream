module.exports = {
  theme: {
    extend: {
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "104": "30rem"
      }
    }
  },
  
  variants: {  
    display: ["responsive", "hover", "focus"]
  },
  
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.animate-3s': {
          transition: 'width 0.3s ease-in-out',
        },
        '.animate-4s': {
          transition: 'width 0.4s ease-in-out',
        },
        '.animate-6': {
          transition: 'width 0.6s ease-in-out',
        }, 
      }

      addUtilities(newUtilities)
    }
  ]
};

