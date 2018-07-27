const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users.js');
//socket.io makes it dead simple to configure web sockets

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
//you already use this with app.listen http is actually used behind the scenes so you
//can provide the app as an argument
var server = http.createServer(app);

//we want to pass in the server we want to listen to and emit events on
var io = socketIO(server);
var users = new Users(); //we create this to add, remove, fetch and manipulate data

//this should appear in the terminal, the connection is kept open for as long as possible

io.on('connection', (socket) => {
    console.log('New User Connected');


    //info gets lost after callback is complete
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room) ){
            return callback('Name and room name are required'); //use return to make sure none of the code runs if the data is not valid
        }

        //join a specific room
        socket.join(params.room);
        //remove the user from any potential previous rooms
        users.removeUser(socket.id);
        //add the new user to the list
        users.addUser(socket.id, params.name, params.room);

        //update user list for that particular room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //socket.leave('THe office fans)
        //use io.to to emit an event to every one in a specific room
        //io.emit - emits to every single connected user -> io.to('The Office Fans').emit
        //use socket.broadcast.to('The office Fans'- sends to everyone but the current user)
        //socket.broadcast.emit- every user but you
        //socket.emit-emits an event specifically to one user
            //call a method on socket to emit to client, the object lets you specify anything you like

        //socket.emit from Admin text welcome to the chat to user that joined
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

        //socket.broadcast.emit from params.name, text: new user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Admin`, `${params.name} has Joined`));


        //call the callback function
        callback();
    });


    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        //io.emit emits an event to every single connection the message from one user
        //is emitted to every single other user
        
        //broadcast will send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        // });
        //this calls the function on the client side
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        
        if(user) {
            //update the user list and the room people
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            //generate the message after the user has left
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        
    });

    
});//registers an event register



app.use(express.static(publicPath));

server.listen(port, () => {

    console.log(`Server Started on Port ${port}`);
});
