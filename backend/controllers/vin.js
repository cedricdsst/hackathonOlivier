// VinController.js
const Vin = require('../models/Vin');
const Atelier = require('../models/Atelier');
const fs = require('fs');

// Create a new Vin
exports.createVin = (req, res, next) => {
    const vinObject = JSON.parse(req.body.vin);
    delete vinObject._id;

    const fileUrl = req.file ? `${req.protocol}://${req.get('host')}/topicFiles/${req.file.filename}` : null;

    const vin = new Vin({
        ...vinObject,
        fileUrl: fileUrl // This will be null if no file is uploaded
    });

    vin.save()
        .then(() => res.status(201).json({ message: 'Vin enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Get all Vins
exports.getAllVins = (req, res, next) => {
    Vin.find()
        .then(vins => {
            const promises = vins.map(vin => {
                return Atelier.find({ "vins.id": vin._id })
                    .then(ateliers => {
                        const totalUsedQuantity = ateliers.reduce((acc, atelier) => {
                            if (atelier.vins && atelier.vins.length > 0) {
                                const vinEntry = atelier.vins.find(v => v.id && v.id.equals(vin._id));
                                return acc + (vinEntry && vinEntry.quantity ? vinEntry.quantity : 0);
                            }
                            return acc;
                        }, 0);
                        const quantiteDispo = vin.quantite - totalUsedQuantity;
                        return {
                            ...vin._doc,
                            ateliers: ateliers.map(atelier => {
                                const vinEntry = atelier.vins.find(v => v.id && v.id.equals(vin._id));
                                return vinEntry ? {
                                    id: atelier._id,
                                    title: atelier.title,
                                    quantity: vinEntry.quantity
                                } : null;
                            }).filter(v => v),
                            quantiteDispo
                        };
                    });
            });
            return Promise.all(promises);
        })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(400).json({ error }));
};




// Get a single Vin by its ID
exports.getOneVin = (req, res, next) => {
    Vin.findById(req.params.id)
        .then(vin => res.status(200).json(vin))
        .catch(error => res.status(404).json({ error }));
};

// Update a Vin by its ID
// Update a Vin by its ID
exports.updateVin = (req, res, next) => {
    Vin.findById(req.params.id)
        .then(vin => {
            if (!vin) {
                return res.status(404).json({ message: 'Vin not found' });
            }

            // Update only the fields provided in the request body
            if (req.body.vin) {
                const vinUpdates = JSON.parse(req.body.vin);
                for (let key in vinUpdates) {
                    vin[key] = vinUpdates[key];
                }
            }

            if (req.file) {
                const oldFilename = vin.fileUrl ? vin.fileUrl.split('/vinFiles/')[1] : null;
                if (oldFilename) {
                    fs.unlink(`vinFiles/${oldFilename}`, err => {
                        if (err) {
                            console.log('Error deleting old file:', err);
                        }
                    });
                }
                vin.fileUrl = `${req.protocol}://${req.get('host')}/vinFiles/${req.file.filename}`;
            }

            vin.save()
                .then(() => res.status(200).json({ message: 'Vin updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



// Delete a Vin
exports.deleteVin = (req, res, next) => {
    Atelier.find({ "vins.id": req.params.id })
        .then(ateliers => {
            // Check if any Ateliers are using this Vin
            if (ateliers && ateliers.length > 0) {
                return res.status(400).json({ message: 'Vin cannot be deleted because it is used in one or more Ateliers.' });
            }
            // If not used, proceed to delete the Vin
            Vin.findById(req.params.id)
                .then(vin => {
                    if (!vin) {
                        return res.status(404).json({ message: 'Vin not found' });
                    }
                    const filename = vin.fileUrl && vin.fileUrl.split('/vinFiles/')[1];
                    if (filename) {
                        fs.unlink(`vinFiles/${filename}`, err => {
                            if (err) {
                                console.log('Error deleting file:', err);
                                return res.status(500).json({ message: 'Failed to delete file', error: err.message });
                            }
                            deleteVinDocument(req, res);
                        });
                    } else {
                        deleteVinDocument(req, res);
                    }
                })
                .catch(error => {
                    console.error('Error finding vin:', error);
                    res.status(500).json({ message: 'Error finding vin', error: error.message });
                });
        })
        .catch(error => {
            console.error('Error checking atelier references:', error);
            res.status(500).json({ error });
        });
};

function deleteVinDocument(req, res) {
    Vin.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Vin deleted successfully!' }))
        .catch(error => {
            console.error('Error deleting vin:', error);
            res.status(400).json({ message: 'Error deleting vin', error: error.message });
        });
}






