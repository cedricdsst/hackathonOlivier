const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const ecoleCtrl = require('../controllers/ecole');

router.get('/', ecoleCtrl.getAllEcoles);
router.post('/', ecoleCtrl.createEcole);
router.get('/:id', ecoleCtrl.getOneEcole);
router.delete('/:id', ecoleCtrl.deleteEcole);
router.patch('/:id', ecoleCtrl.updateEcole);

module.exports = router;