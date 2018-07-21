const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


//socket.io makes it dead simple to configure web sockets

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
//you already use this with app.listen http is actually used behind the scenes so you
//can provide the app as an argument
var server = http.createServer(app);

//we want to pass in the server we want to listen to and emit events on
var io = socketIO(server);

//this should appear in the terminal, the connection is kept open for as long as possible

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});//registers an event register



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});
