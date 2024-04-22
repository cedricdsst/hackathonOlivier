const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-vin');

const vinCtrl = require('../controllers/vin');

router.get('/', vinCtrl.getAllVins);
router.post('/', auth, multer, vinCtrl.createVin);
router.get('/:id', vinCtrl.getOneVin);
router.delete('/:id', auth, vinCtrl.deleteVin);
router.patch('/:id', auth, multer, vinCtrl.updateVin);

module.exports = router;