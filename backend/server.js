const http = require('http');
const { Server } = require("socket.io");
const app = require('./app');


require('./cron_tasks/mailSender.js');

const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    // Rejoindre une room spécifique
    socket.on('joinChatRoom', (topicId) => {
        console.log(`Rejoindre la room: ${topicId}`);
        socket.join(topicId);
    });

    // Quand un utilisateur envoie un message dans le chat
    socket.on('chatMessage', (data) => {
        // 'data' doit contenir 'topicId' et le 'message'
        console.log(`Message reçu dans la room ${data.topicId}: ${data.message}`);
        // Envoyer le message à tous dans cette room
        io.to(data.topicId).emit('newChatMessage', data.message);
    });

    // Optionnellement, gérer le départ de la room si nécessaire
    socket.on('leaveChatRoom', (topicId) => {
        socket.leave(topicId);
    });
});
app.set('io', io);


server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
