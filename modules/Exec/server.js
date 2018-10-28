exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){
    var { exec } = require('child_process');

    exec('`+datos.data.msg+`', function(err, stdout, stderr)  {
      if(stdout) {
        `;
          for(var out in datos.outputs.Name.connections){
             content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: stdout});`
          }
          content += `
      }
    });
  });

  `;
  return  content;
}
