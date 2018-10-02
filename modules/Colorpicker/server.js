
exports.load = function(datos, host, port, board) {
var content;
content += `

// EMPIEZA COLORPICKER
socket.on('read`+datos.id+`', function(data){
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: data});`
    }
    content += `
  });

//});

// FIN COLORPICKER
`;
return  content;
}
