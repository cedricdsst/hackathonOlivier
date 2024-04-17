const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const chatCtrl = require('../controllers/chat');

router.get('/topic/:topicId', chatCtrl.getAllChats);
router.post('/topic/:topicId', auth, chatCtrl.createChat);
router.get('/:id', chatCtrl.getOneChat);


module.exports = router;