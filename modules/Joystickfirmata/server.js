exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA Joystick

var pin`+datos.id+` = new five.Joystick({
  pins: ['`+datos.data.msg+`',  '`+datos.data.msg2+`']
});


pin`+datos.id+`.on("change", function() {

  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: this.x });`

    }
    for(var out in datos.outputs.Name2.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name2.connections[out].node+`, data: this.y });`

    }
    content += `

});


// FIN Joystick
`;
return  content;
};
