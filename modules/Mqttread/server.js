exports.load = function(datos, host, port, board) {
  var content;

  content += `

  moscaserver.subscribe('`+datos.data.msg+`', function(topic, packet) {
    var packet = ' '+packet;
    packet = packet.trim();
    `;

      for(var out in datos.outputs.Name.connections){
         content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: packet});`
      }
      content += `
  });

  `;
  return  content;
}
