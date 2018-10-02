exports.load = function(datos, host, port, board) {
  var content;

  content += `
  var cron = require('node-cron');

cron.schedule('* * * * *', () => {
      `;
        for(var out in datos.outputs.Name.connections){
           content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`});`
        }
        content += `

});




  `;
  return  content;
}
