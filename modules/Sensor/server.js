exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA Light

var pin`+datos.id+` = new five.Sensor('`+datos.data.msg+`');


pin`+datos.id+`.on("change", function() {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: this.value});`
    }
    content += `

});


// FIN LIGHT
`;
return  content;
};
