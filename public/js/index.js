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

//target="_blank" tells the current tab to open up a new tab in another
socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    //we're not putting these into template strings in order to not allow someone to inject html
    li.text(`${message.from}: `);
    //set the href value equal to url
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

//we need to add an event into the function that overrides the default page refresh
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from:'User',
        text: messageTextbox.val()
    }, function(){
        //once the request has been received, clear the value
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not Supported');
    } 
    //disables location button after being pressed
    locationButton.attr('disabled', 'disabled').text('Sending Location....');

    navigator.geolocation.getCurrentPosition( function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location')
        alert('Unable to fetch location');
    });
});