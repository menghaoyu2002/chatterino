const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + '/public'));

app.get('/chat/:roomid', (req, res) => {
    res.redirect(`/chat.html?roomid=${req.params.roomid}`);
});

app.get(/join?\/*/, (req, res) => {
    res.redirect('/join.html');
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        console.log('invalid username');
        return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
});

io.use((socket, next) => {
    socket.roomid = socket.handshake.auth.roomid;
    if (!socket.roomid) {
        socket.roomid = socket.id;
    }
    next();
});

io.on('connection', (socket) => {
    console.log(`user ${socket.username} connected`);

    socket.join(socket.roomid);
    console.log(`user ${socket.username} joined room ${socket.roomid}`);

    socket.on('disconnect', (reason) => {
        console.log(`user ${socket.username} disconnected`);
    });
});

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});
