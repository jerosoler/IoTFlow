exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){


    setTimeout(function(){
      `;
        for(var out in datos.outputs.Name.connections){
           content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: data});`
        }
        content += `

    }, `+datos.data.msg+`);

  });




  `;
  return  content;
}
