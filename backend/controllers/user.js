const User = require('../models/User');

exports.getOneUser = (req, res, next) => {
    User.findOne({
        username: req.params.username
    }, 'username email followers following')
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Get count of followers and following
            const followersCount = user.followers.length;
            const followingCount = user.following.length;

            // Construct response object with required fields and counts
            const response = {
                username: user.username,
                email: user.email,
                followers: followersCount,
                following: followingCount
            };

            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};


exports.getFollowers = async (req, res) => {
    const username = req.query.username;
    try {
        const user = await User.findOne({ username }).populate('followers');
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).json(user.followers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtenir tous les utilisateurs suivis par un utilisateur par son username
exports.getFollowings = async (req, res) => {
    const username = req.query.username;
    try {
        const user = await User.findOne({ username }).populate('following');
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).json(user.following);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Suivre un nouvel utilisateur
exports.followUser = async (req, res) => {
    const usernameToFollow = req.body.username;
    const userId = req.auth.userId;

    try {
        const userToFollow = await User.findOne({ username: usernameToFollow });
        const currentUser = await User.findById(userId);

        if (!userToFollow) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Vérifier si l'utilisateur suit déjà l'utilisateur cible
        if (currentUser.following.includes(userToFollow._id)) {
            return res.status(400).send({ message: 'You are already following this user.' });
        }

        // Ajouter l'utilisateur cible à la liste des followings de l'utilisateur actuel
        currentUser.following.push(userToFollow._id);
        await currentUser.save();

        // Optionnel : Ajouter l'utilisateur actuel à la liste des followers de l'utilisateur cible
        userToFollow.followers.push(currentUser._id);
        await userToFollow.save();

        res.status(200).send({ message: 'User followed successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Ne plus suivre un utilisateur
exports.unfollowUser = async (req, res) => {
    const usernameToUnfollow = req.body.username;
    const userId = req.auth.userId;

    try {
        const userToUnfollow = await User.findOne({ username: usernameToUnfollow });
        const currentUser = await User.findById(userId);

        if (!userToUnfollow) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Retirer l'utilisateur de la liste des followings de l'utilisateur actuel
        currentUser.following = currentUser.following.filter(followingId => !followingId.equals(userToUnfollow._id));
        await currentUser.save();

        // Optionnel : Retirer l'utilisateur actuel de la liste des followers de l'utilisateur cible
        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => !followerId.equals(currentUser._id));
        await userToUnfollow.save();

        res.status(200).send({ message: 'User unfollowed successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};