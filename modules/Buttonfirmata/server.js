exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA Light

var pin`+datos.id+` = new five.Button('`+datos.data.msg+`');


pin`+datos.id+`.on("down", function() {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: true});`
    }
    content += `

});


pin`+datos.id+`.on("up", function() {
  `;
    for(var out in datos.outputs.Name2.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name2.connections[out].node+`, data: true});`
    }
    content += `

});


// FIN LIGHT
`;
return  content;
};
