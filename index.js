const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
require('dotenv').config();

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

    socket.on('message_sent', (message) => {
        console.log(`user ${socket.username} said ${message}`);
        io.to(socket.roomid).emit('message', {
            message,
            from: socket.username,
        });
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.username} disconnected`);
    });
});

httpServer.listen(process.env.PORT, () => {
    console.log('listening on port: ' + process.env.PORT);
});
