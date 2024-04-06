const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://cedricdsst:C9STiOiaJQYv8j3I@cluster0.7oiduv6.mongodb.net/chokbar?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Configuration CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Remplacez par l'origine de votre frontend
    credentials: true, // Permettre les cookies et les en-têtes d'authentification
};
app.use(cors(corsOptions));

// Rendre les fichiers dans 'topicFiles' accessibles publiquement
app.use('/topicFiles', express.static(path.join(__dirname, 'topicFiles')));

// Routes
const topicRoutes = require('./routes/topic');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/topic', topicRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
