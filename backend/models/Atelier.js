const mongoose = require('mongoose');

// Sous-schéma pour les participants avec un ID unique pour chaque participant
const participantSchema = mongoose.Schema({
    email: { type: String, required: true },
    payed: { type: Boolean, default: false }
}, { _id: true });  // Active l'option _id pour générer un ObjectId unique pour chaque participant

const AtelierSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    adresse: { type: String, required: false },
    startDate: { type: Date, required: false },
    duration: { type: Number, required: false },
    finished: { type: Boolean, default: false },
    price: { type: Number, required: true },
    participantsMax: { type: Number, default: 14 },
    creationDate: { type: Date, default: Date.now },
    password: { type: String, required: true },

    files: [{
        fileUrl: { type: String, required: true },
        fileType: { type: String, required: true }
    }],

    // Utilisation du sous-schéma participantSchema pour les participants
    participants: [participantSchema],

    vins: [{
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vin' },
        quantity: { type: Number, required: true }
    }],

    idEcole: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Ecole' }
});

module.exports = mongoose.model('Atelier', AtelierSchema);
