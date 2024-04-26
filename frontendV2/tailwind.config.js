module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Analyser les fichiers Vue.js et JavaScript/TypeScript
    './public/index.html' // Analyser le fichier index.html pour les classes utilisées dans le contenu statique
  ],
  theme: {
    extend: {
      colors: {
        'VinColor': '#8c2c2c',
      },
    } // Étendre ou personnaliser le thème Tailwind CSS si nécessaire
  },
  plugins: [] // Activer les plugins Tailwind CSS si nécessaire
}
