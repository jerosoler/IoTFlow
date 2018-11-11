exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA ALEXA

var wemore = require('wemore')

var variable`+datos.id+` = wemore.Emulate({friendlyName: "`+datos.data.msg+`", port: `+datos.data.msg2+`}); // choose a port


variable`+datos.id+`.on('on', function(self, sender) {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: true});`
    }
    content += `
});

variable`+datos.id+`.on('off', function(self, sender) {
  `;
    for(var out in datos.outputs.Name2.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name2.connections[out].node+`, data: true});`
    }
    content += `
});



// FIN ALEXA
`;
return  content;
};
