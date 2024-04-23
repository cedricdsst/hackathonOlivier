const mongoose = require('mongoose');

// Sous-schéma pour les participants avec un ID unique pour chaque participant
const participantSchema = mongoose.Schema({
    email: { type: String, required: true },
    school: { type: String, required: false },
    payed: { type: Boolean, default: false }
}, { _id: true });  // Active l'option _id pour générer un ObjectId unique pour chaque participant

const AtelierSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    creationDate: { type: Date, default: Date.now },
    startDate: { type: Date, required: false },
    duration: { type: Number, required: false },
    password: { type: String, required: true },
    finished: { type: Boolean, default: false },

    files: [{
        fileUrl: { type: String, required: true },
        fileType: { type: String, required: true }
    }],

    participantsMax: { type: Number, default: 14 },

    // Utilisation du sous-schéma participantSchema pour les participants
    participants: [participantSchema],

    vins: [{
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vin' },
        quantity: { type: Number, required: true }
    }],

    idEcole: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Ecole' }
});

module.exports = mongoose.model('Atelier', AtelierSchema);
