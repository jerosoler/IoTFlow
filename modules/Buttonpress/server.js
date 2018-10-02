
exports.load = function(datos, host, port, board) {
var content;
content += `

// EMPIEZA BUTTON


socket.on('read`+datos.id+`', function(data){
  var dato;
  switch (data) {
    case true:
        dato = true;
      break;
    case false:
        dato = false;
      break;
    }

  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: dato});`
    }
    content += `
  });




//});

// FIN BUTTON
`;
return  content;
}
