var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');

//the user will be able to spoof the created at so it should only be on the server
    socket.emit('createMessage', {
        to:'jerry',
        text: `Hi jerry you're the best`
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected From Server');
});

//the data emitted with your event is provided by the first argument
socket.on('newEmail', function(email){
    console.log('New Email', email);
});

socket.on('newMessage', function(msg){
    console.log('Message:', msg);
});