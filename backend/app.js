const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://cedricdsst:C9STiOiaJQYv8j3I@cluster0.7oiduv6.mongodb.net/hackathonOlivier?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée  !', err));

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
const vinRoutes = require('./routes/vin');
const ecoleRoutes = require('./routes/ecole');
const atelierRoutes = require('./routes/atelier');

app.use('/api/topic', topicRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vin', vinRoutes);
app.use('/api/ecole', ecoleRoutes);
app.use('/api/atelier', atelierRoutes);

module.exports = app;
