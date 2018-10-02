const io = require('socket.io-client');

var socket = io(process.env.WS_URL);
//var socket = io('http://192.168.1.9:3000');
//console.log("HOLA");
//console.log(process.env.WS_URL);

export default socket;
