exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){

    if(data == `+datos.data.msg+`) {

     `;
        for(var out in datos.outputs.Name.connections){
           content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: data});`
        }
        content += `
    } else { `;
        for(var out in datos.outputs.Name2.connections){
           content += `socket.emit('command', {command:"read"+`+datos.outputs.Name2.connections[out].node+`, data: data});`
        }
        content += ` }
});
  `;
  return  content;
}
