exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){

     function read`+datos.id+`(data) {`+datos.data.msg+`};
     var dato = read`+datos.id+`(data);
    `;
      for(var out in datos.outputs.Name.connections){
         content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: dato});`
      }
      content += `

  });




  `;
  return  content;
}
