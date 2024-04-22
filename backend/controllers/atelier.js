const Atelier = require('../models/Atelier');
const Ecole = require('../models/Ecole');  // Assuming Ecole model is needed for reference
const Vin = require('../models/Vin');      // Assuming Vin model is needed for reference
const { sendEmail } = require('../services/emailService');
const fs = require('fs');

function generateRandomPassword() {
    // Generates a random number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000).toString();
}


// Create an Atelier
exports.createAtelier = (req, res) => {
    const atelier = new Atelier({
        ...req.body,
        password: generateRandomPassword()  // Assign a random password
    });

    atelier.save()
        .then(() => res.status(201).json({
            message: 'Atelier created successfully!',
            atelierId: atelier._id,  // Optionally return the atelier ID
            password: atelier.password  // Optionally return the generated password
        }))
        .catch(error => res.status(400).json({ error }));
};


exports.deleteAtelier = (req, res) => {
    Atelier.findByIdAndRemove(req.params.id)
        .then(atelier => {
            if (!atelier) return res.status(404).json({ message: 'Atelier not found.' });
            res.status(200).json({ message: 'Atelier deleted successfully!' });
        })
        .catch(error => res.status(500).json({ error }));
};


// Get one Atelier with detailed information
exports.getOneAtelier = (req, res) => {
    const { idAtelier } = req.params;
    Atelier.findById(idAtelier)
        .populate('idEcole')
        .populate({
            path: 'vins.id',
            model: 'Vin'
        })
        .then(atelier => {
            if (!atelier) return res.status(404).json({ message: 'Atelier not found.' });
            res.status(200).json(atelier);
        })
        .catch(error => {
            console.error('Error fetching Atelier:', error);
            res.status(400).json({ error: error.message });
        });
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

// Ajouter un participant à un atelier
exports.addParticipantToAtelier = (req, res) => {
    const { idAtelier } = req.params;
    const { email, school } = req.body;

    const newParticipant = {
        email,
        school
    };

    Atelier.findByIdAndUpdate(
        idAtelier,
        { $push: { participants: newParticipant } },
        { new: true, safe: true }
    )
        .then(atelier => {
            res.status(200).json({ message: 'Participant added to Atelier.', atelier });
            sendEmail(email, 'Confirmation de participation', `Vous êtes inscrit à l'atelier ${atelier.name} avec l'école ${school}.`).catch(console.error);
        })
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un participant d'un atelier
exports.removeParticipantFromAtelier = (req, res) => {
    const { idAtelier, participantId } = req.params;  // ID de l'atelier et ID du participant depuis les paramètres de la route

    Atelier.findByIdAndUpdate(
        idAtelier,
        { $pull: { participants: { _id: participantId } } },
        { new: true }
    )
        .then(atelier => {
            if (!atelier) {
                return res.status(404).json({ message: 'Atelier not found or participant not found.' });
            }
            res.status(200).json({ message: 'Participant removed from Atelier.', atelier });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.confirmPaymentForParticipant = (req, res) => {
    const { idAtelier, participantId } = req.params;

    // Find the atelier and the participant within it
    Atelier.findOne({ "_id": idAtelier, "participants._id": participantId })
        .then(atelier => {
            if (!atelier) {
                return res.status(404).json({ message: 'Atelier not found or participant not found.' });
            }

            // Update the payed status for the participant
            const participant = atelier.participants.id(participantId);
            participant.payed = true;

            return atelier.save(); // Save the atelier with the updated participant
        })
        .then(atelier => {
            const participant = atelier.participants.id(participantId);

            // Prepare the email content including the Atelier's password
            const emailContent = `Votre paiement pour l'atelier "${atelier.title}" a été confirmé. Voici votre mot de passe pour accéder à l'atelier: ${atelier.password}`;

            // Send a confirmation email to the participant including the password
            sendEmail(
                participant.email,
                'Confirmation de paiement',
                emailContent
            )
                .then(() => {
                    res.status(200).json({ message: 'Payment confirmed and participant notified.', atelier });
                })
                .catch(emailError => {
                    // Handle the case where payment is confirmed but email sending fails
                    console.error('Failed to send confirmation email', emailError);
                    res.status(200).json({
                        message: 'Payment confirmed, but failed to send confirmation email.',
                        emailError: emailError.message,
                        atelier
                    });
                });
        })
        .catch(error => res.status(400).json({ error }));
};


exports.addFileToAtelier = (req, res) => {
    const { idAtelier } = req.params;
    let fileType = '';

    if (req.file && req.file.mimetype) {
        const mimeType = req.file.mimetype;
        if (mimeType.startsWith('image/')) {
            fileType = 'image';
        } else if (mimeType.startsWith('video/')) {
            fileType = 'video';
        } else if (mimeType === 'application/pdf') {
            fileType = 'pdf';
        } else {
            // Handle other file types or set a default
            fileType = 'other'; // or any default you prefer
        }
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file provided.' });
    }

    const file = {
        fileUrl: `${req.protocol}://${req.get('host')}/topicFiles/${req.file.filename}`,
        fileType: fileType
    };

    Atelier.findByIdAndUpdate(
        idAtelier,
        { $push: { files: file } },
        { new: true, safe: true, useFindAndModify: false }
    )
        .then(updatedAtelier => res.status(201).json({ message: 'File added to Atelier.', atelier: updatedAtelier }))
        .catch(error => res.status(400).json({ error }));
};



exports.removeFileFromAtelier = (req, res) => {
    const { idAtelier, fileId } = req.params;

    Atelier.findById(idAtelier)
        .then(atelier => {
            if (!atelier) {
                return res.status(404).json({ message: 'Atelier not found.' });
            }

            // Extract file for filename (to delete from the file system)
            const file = atelier.files.id(fileId);
            if (!file) {
                return res.status(404).json({ message: 'File not found.' });
            }

            // Save filename before removing it from the database
            const filename = file.fileUrl.split('/topicFiles/')[1];

            // Use $pull to remove the file from the Atelier document
            return Atelier.findByIdAndUpdate(
                idAtelier,
                { $pull: { files: { _id: fileId } } },
                { new: true }
            ).then(() => filename);  // Pass filename to the next then()
        })
        .then(filename => {
            // Delete the file from the filesystem
            fs.unlink(`./topicFiles/${filename}`, err => {
                if (err) {
                    throw new Error(`Failed to delete the file: ${err.message}`);
                }
                res.status(200).json({ message: 'File removed from Atelier and server.' });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(400).json({ error: error.message });
        });
};






