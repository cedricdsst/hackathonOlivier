const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    if (!req.body.password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error: error }));
};

exports.login = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Pair identifier/password incorrect' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Pair identifier/password incorrect' });
                    } else {
                        const token = jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' } // Adjust as needed
                        );

                        // Determine if the "Stay Logged In" option was selected
                        const stayLoggedIn = req.body.stayLoggedIn === true;

                        const cookieOptions = {
                            httpOnly: true,
                            secure: false, // Set to true in production with HTTPS
                            sameSite: 'strict'
                        };

                        if (stayLoggedIn) {
                            // Set a longer expiration for the cookie, e.g., 7 days
                            cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
                        } // If stayLoggedIn is false, don't set maxAge to create a session cookie

                        res.cookie('auth_token', token, cookieOptions);

                        res.status(200).json({


                            message: "User successfully logged in!",
                            data: {
                                userId: user._id,
                                username: user.username,
                                email: user.email
                            }
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({ error });
                });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};



exports.verifyToken = (req, res) => {
    // The userId has been added to req.auth by your middleware
    const userId = req.auth.userId;

    // Query the database for the user's details using the userId
    User.findById(userId).select('username email -_id') // Exclude _id from the result
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // User found, return the username and email
            res.status(200).json({
                message: "Token is valid",
                data: {
                    userId: userId,
                    username: user.username,
                    email: user.email
                }
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message || 'An error occurred during the operation.' });
        });
};

exports.logout = (req, res) => {
    // Clear the authentication cookie
    res.cookie('auth_token', '', {
        httpOnly: true,
        secure: false, // Adjust this as per your environment (use true in production with HTTPS)
        sameSite: 'strict',
        expires: new Date(0) // Set the cookie to expire immediately
    }).status(200).json({ message: 'User successfully logged out' });
};



