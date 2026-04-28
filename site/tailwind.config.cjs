module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        muted: '#9ca3af',
        accent: '#d4af37'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Poppins', 'Inter', 'serif']
      },
      maxWidth: {
        'content': '1100px'
      }
    }
  },
  plugins: []
}
