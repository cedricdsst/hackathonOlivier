const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Assurez-vous que le chemin est correct
const auth = require('../middleware/auth');

router.get('/profile/:username', userController.getOneUser);
router.get('/followers', userController.getFollowers);
router.get('/followings', userController.getFollowings);
router.post('/follow', auth, userController.followUser);
router.post('/unfollow', auth, userController.unfollowUser);

module.exports = router;
