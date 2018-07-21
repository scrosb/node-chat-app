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

    //call a method on socket to emit to client, the object lets you specify anything you like

    //socket.emit from Admin text welcome to the chat to user that joined
    socket.emit('newMessage', {
        from:'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    //socket.broadcast.emit from Admin, text: new user joined

    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    });


    socket.on('createMessage', (message) => {
        // console.log('createMessage:', message);
        //io.emit emits an event to every single connection the message from one user
        //is emitted to every single other user
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        //broadcast will send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        // });

    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    
});//registers an event register



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});
