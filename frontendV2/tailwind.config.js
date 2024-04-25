module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Analyser les fichiers Vue.js et JavaScript/TypeScript
    './public/index.html' // Analyser le fichier index.html pour les classes utilisées dans le contenu statique
  ],
  theme: {
    extend: {
      colors: {
        'color-wine': '#8c2c2c', // Ajouter la couleur personnalisée sous un nom descriptif
      },
    } // Étendre ou personnaliser le thème Tailwind CSS si nécessaire
  },
  plugins: [] // Activer les plugins Tailwind CSS si nécessaire
}
