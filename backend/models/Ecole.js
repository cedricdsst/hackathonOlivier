const mongoose = require('mongoose');

const EcoleSchema = mongoose.Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true }
});

module.exports = mongoose.model('Ecole', EcoleSchema);
