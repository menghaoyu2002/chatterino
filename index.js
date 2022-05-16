const express = require("express");
const { Server } = require("socket.io");

const app = express();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('a user connected');
});

app.listen(3000);