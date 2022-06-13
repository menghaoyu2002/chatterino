const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + '/public'));

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
});

io.on('connection', (socket) => {
    console.log(`user ${socket.username} connected`);
});

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});
