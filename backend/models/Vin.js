// Vin.js
const mongoose = require('mongoose');

const VinSchema = mongoose.Schema({
    nom: { type: String, required: true },
    region: { type: String, required: false },
    cepage: { type: String, required: false },
    annee: { type: Number, required: false },
    quantite: { type: Number, required: true },
    description: { type: String, required: false },
    fileUrl: { type: String, required: false }
});

module.exports = mongoose.model('Vin', VinSchema);
