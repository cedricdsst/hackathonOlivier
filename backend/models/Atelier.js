const mongoose = require('mongoose');

const AtelierSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },



    creationDate: { type: Date, default: Date.now },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },

    files: [{
        fileUrl: { type: String, required: true },
        fileType: { type: String, required: true }
    }],

    participantsMax: { type: Number, required: true, default: Date.now },

    participants: [{
        email: { type: String, required: true },
        school: { type: String, required: false }
    }],


    vins: [{
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vin' },
        quantity: { type: Number, required: true }
    }],

    idEcole: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Ecole' }

});

module.exports = mongoose.model('Atelier', AtelierSchema);
