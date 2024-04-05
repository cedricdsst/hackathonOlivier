const express = require('express');
const mongoose = require('mongoose');
const app = express();
const topicRoutes = require('./routes/topic');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://cedricdsst:C9STiOiaJQYv8j3I@cluster0.7oiduv6.mongodb.net/chokbar?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/topic', topicRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/topicFiles', express.static(path.join(__dirname, 'topicFiles')));

module.exports = app;