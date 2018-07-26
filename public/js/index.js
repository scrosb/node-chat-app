var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');

//the user will be able to spoof the created at so it should only be on the server
});

socket.on('disconnect', function(){
    console.log('Disconnected From Server');
});

//the data emitted with your event is provided by the first argument
socket.on('newEmail', function(email){
    console.log('New Email', email);
});

socket.on('newMessage', function(msg){
    console.log('newMessage', msg);
    //create a list item
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

//we have to add a 3rd element on the server and client to acknowledge the event
// socket.emit('createMessage', {
//     from:'Frank',
//     text:'Hi'
// }, function (data) {
//     console.log('Got it',data);
// });



//we need to add an event into the function that overrides the default page refresh
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from:'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not Supported');
    } 
    navigator.geolocation.getCurrentPosition( function (position) {
        console.log(position);
    }, function() {
        alert('Unable to fetch location');
    })
});