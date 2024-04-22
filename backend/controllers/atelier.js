const Atelier = require('../models/Atelier');
const Ecole = require('../models/Ecole');  // Assuming Ecole model is needed for reference
const Vin = require('../models/Vin');      // Assuming Vin model is needed for reference

// Create an Atelier
exports.createAtelier = (req, res) => {
    const atelier = new Atelier({
        ...req.body
    });
    atelier.save()
        .then(() => res.status(201).json({ message: 'Atelier created successfully!' }))
        .catch(error => res.status(400).json({ error }));
};


// Get one Atelier with detailed information
exports.getOneAtelier = (req, res) => {
    Atelier.findById(req.params.id)
        .populate('idEcole')
        .populate({
            path: 'vins.id',
            model: 'Vin'
        })
        .then(atelier => {
            if (!atelier) return res.status(404).json({ message: 'Atelier not found.' });
            res.status(200).json(atelier);
        })
        .catch(error => res.status(400).json({ error }));
};


// Get all Ateliers with detailed information
exports.getAllAteliers = (req, res) => {
    Atelier.find()
        .populate('idEcole')
        .populate({
            path: 'vins.id',
            model: 'Vin'
        })
        .then(ateliers => res.status(200).json(ateliers))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un vin d'un atelier
exports.removeVinFromAtelier = (req, res) => {
    const { idAtelier, vinId } = req.params; // Récupérer l'ID de l'atelier et l'ID du vin depuis les paramètres de la requête

    Atelier.findByIdAndUpdate(
        idAtelier,
        { $pull: { vins: { id: vinId } } }, // Utiliser $pull pour retirer le vin spécifié
        { new: true, safe: true } // Options pour retourner le document modifié et assurer la sécurité de l'opération
    )
        .then(atelier => {
            if (!atelier) {
                return res.status(404).json({ message: 'Atelier not found.' });
            }
            res.status(200).json({ message: 'Vin removed from Atelier.', atelier });
        })
        .catch(error => res.status(400).json({ error }));
};


// Ajouter un vin à un atelier
exports.addVinToAtelier = (req, res) => {
    const { idAtelier } = req.params;  // ID de l'atelier depuis les paramètres de la route
    const { vinId, quantity } = req.body;  // ID du vin et quantité depuis le corps de la requête

    const newVin = {
        id: vinId,
        quantity
    };

    Atelier.findByIdAndUpdate(
        idAtelier,
        { $push: { vins: newVin } },  // Utiliser $push pour ajouter le nouvel objet vin
        { new: true, safe: true, upsert: true }  // Options pour créer le document si non existant et retourner le document modifié
    )
        .then(atelier => res.status(200).json({ message: 'Vin added to Atelier.', atelier }))
        .catch(error => res.status(400).json({ error }));
};


// Modifier un vin dans un atelier
exports.updateVinInAtelier = (req, res) => {
    const { idAtelier, vinId } = req.params;  // ID de l'atelier et ID du vin depuis les paramètres de la route
    const { quantity } = req.body;  // Nouvelle quantité depuis le corps de la requête

    // MongoDB utilise l'index pour cibler l'élément dans le tableau à mettre à jour
    Atelier.findOneAndUpdate(
        { "_id": idAtelier, "vins.id": vinId },
        { "$set": { "vins.$.quantity": quantity } },  // Mettre à jour uniquement la quantité du vin spécifié
        { new: true }
    )
        .then(atelier => {
            if (!atelier) {
                return res.status(404).json({ message: 'Atelier or Vin not found.' });
            }
            res.status(200).json({ message: 'Vin updated in Atelier.', atelier });
        })
        .catch(error => res.status(400).json({ error }));
};
