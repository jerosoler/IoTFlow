exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA PIN READ

var pin`+datos.id+` = new five.Pin('`+datos.data.msg+`');
/*
socket.on('read`+datos.id+`', function(data){
  pin`+datos.id+`.read(function(error, value) {
    console.log("PIN READ:");
    console.log(value);
  });
});
*/


pin`+datos.id+`.read(function(error, value) {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: value});`
    }
    content += `

});


// FIN PIN READ
`;
return  content;
};
