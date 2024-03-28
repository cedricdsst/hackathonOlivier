const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const topicCtrl = require('../controllers/topic');

router.get('/', topicCtrl.getAllTopics);
router.post('/', auth, multer, topicCtrl.createTopic);
router.get('/:id', topicCtrl.getOneTopic);
router.delete('/:id', auth, topicCtrl.deleteTopic);

module.exports = router;