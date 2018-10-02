exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){


    request('`+datos.data.msg+`', function (error, response, body) {
      `;
        for(var out in datos.outputs.Name.connections){
           content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: body});`
        }
        content += `

    });

  });




  `;
  return  content;
}
