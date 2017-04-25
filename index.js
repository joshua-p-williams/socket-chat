var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('Started chat program.');
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    io.emit('chat.message', '** A new user joined.');

    socket.on('chat.message', function (message) {
        io.emit('chat.message', message);
    });

    socket.on('disconnect', function () {
        io.emit('chat.message', '** A user has disconnected.');
    });
});