exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA Light

var pin`+datos.id+` = new five.Proximity({
  controller: '`+datos.data.controller+`',
  pin: '`+datos.data.msg+`'
});


pin`+datos.id+`.on("change", function() {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: this.cm});`
    }
    content += `

});


// FIN LIGHT
`;
return  content;
};
