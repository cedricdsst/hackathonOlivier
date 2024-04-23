const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-atelier');

const atelierCtrl = require('../controllers/atelier');

// Routes pour la gestion des Ateliers
router.post('/', atelierCtrl.createAtelier); // Créer un atelier
router.get('/:idAtelier', atelierCtrl.getOneAtelier); // Obtenir un atelier spécifique avec détails complets
router.get('/', atelierCtrl.getAllAteliers); // Obtenir tous les ateliers avec détails complets
router.delete('/:idAtelier', atelierCtrl.deleteAtelier); // Supprimer un atelier spécifique
router.patch('/:idAtelier', atelierCtrl.updateAtelier);

router.post('/:idAtelier/finish', atelierCtrl.finishAtelier);

router.post('/:idAtelier/files', multer, atelierCtrl.addFileToAtelier);
router.delete('/:idAtelier/files/:fileId', atelierCtrl.removeFileFromAtelier);

// Routes pour la gestion des vins dans un atelier
router.post('/:idAtelier/vins', atelierCtrl.addVinToAtelier); // Ajouter un vin à un atelier
router.patch('/:idAtelier/vins/:vinId', atelierCtrl.updateVinInAtelier); // Mettre à jour un vin dans un atelier
router.delete('/:idAtelier/vins/:vinId', atelierCtrl.removeVinFromAtelier); // Supprimer un vin d'un atelier

// Routes pour la gestion des participants dans un atelier
router.post('/:idAtelier/participants', atelierCtrl.addParticipantToAtelier); // Ajouter un participant à un atelier
router.delete('/:idAtelier/participants/:participantId', atelierCtrl.removeParticipantFromAtelier); // Supprimer un participant d'un atelier

router.patch('/:idAtelier/participants/:participantId/confirm-payment', atelierCtrl.confirmPaymentForParticipant)

module.exports = router;