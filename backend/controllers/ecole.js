// EcoleController.js
const Ecole = require('../models/Ecole');

// Create a new Ecole
exports.createEcole = (req, res, next) => {
    const ecole = new Ecole({
        ...req.body
    });

    ecole.save()
        .then(() => res.status(201).json({ message: 'Ecole enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Retrieve all Ecoles
exports.getAllEcoles = (req, res, next) => {
    Ecole.find()
        .then(ecoles => res.status(200).json(ecoles))
        .catch(error => res.status(400).json({ error }));
};

// Retrieve a single Ecole by ID
exports.getOneEcole = (req, res, next) => {
    Ecole.findById(req.params.id)
        .then(ecole => res.status(200).json(ecole))
        .catch(error => res.status(404).json({ error }));
};

// Update an Ecole (partial update)
exports.updateEcole = (req, res, next) => {
    Ecole.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },  // Use $set with the request body for partial update
        { new: true, runValidators: true }  // Return the updated object and run validators
    )
        .then(ecole => {
            if (!ecole) {
                return res.status(404).json({ message: 'Ecole not found' });
            }
            res.status(200).json(ecole);
        })
        .catch(error => res.status(400).json({ error }));
};

// Delete an Ecole
exports.deleteEcole = (req, res, next) => {
    Ecole.findByIdAndRemove(req.params.id)
        .then(ecole => {
            if (!ecole) {
                return res.status(404).json({ message: 'Ecole not found.' });
            }
            res.status(200).json({ message: 'Ecole deleted successfully!' });
        })
        .catch(error => res.status(500).json({ error }));
};





