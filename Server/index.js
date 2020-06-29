var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server);
var x=1;



app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
   });
   
   
   
   
   
if(x==1){
    io.on('connection', function (socket) {
    socket.on('updateDolar', (data) => io.emit('updateDolar', {data}));
    socket.on('updateEuro', (data) => io.emit('updateEuro', {data}));
    socket.on('updateBitcoin', (data) => io.emit('updateBitcoin', {data}));
    
    
    socket.on('comment', (data) => io.emit('comment', {data}));
   

    
    });
    x=2;
}
// At the first time, we dont want old values to be changed
else{
   io.on('connection', function (socket) {
    socket.on('updateDolar', (data) => io.emit('updateDolar', {data}));
    socket.on('updateEuro', (data) => io.emit('updateEuro', {data}));
    socket.on('updateBitcoin', (data) => io.emit('updateBitcoin', {data}));
    socket.on('OldDolar', (data) => io.emit('OldDolar', {data}));
    socket.on('OldEuro', (data) => io.emit('OldEuro', {data}));
    socket.on('OldBitcoin', (data) => io.emit('OldBitcoin', {data}));
   });
}
   
const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
  