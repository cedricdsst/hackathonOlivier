const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/verifyToken', auth, authCtrl.verifyToken);
router.get('/logout', auth, authCtrl.logout);

module.exports = router;
