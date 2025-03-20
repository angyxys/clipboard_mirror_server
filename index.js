const express = require('express');
const morgan = require('morgan');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

io.on('connection', (socket) => {
  socket.on('keyboard', (data) => {
    io.emit('clipboard_paste', data);
    console.log('Event - Keyboard: ', data);
  });
});

server.listen(8009, () => console.log('Server initialized on http://localhost:8009'));
