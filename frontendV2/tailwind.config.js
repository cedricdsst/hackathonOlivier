module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Analyser les fichiers Vue.js et JavaScript/TypeScript
    './public/index.html' // Analyser le fichier index.html pour les classes utilisées dans le contenu statique
  ],
  theme: {
    extend: {} // Étendre ou personnaliser le thème Tailwind CSS si nécessaire
  },
  plugins: [] // Activer les plugins Tailwind CSS si nécessaire
}
