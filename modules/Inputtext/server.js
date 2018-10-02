
exports.load = function(datos, host, port) {
var content;
content += `
// EMPIEZA INPUT TEXT


socket.on('read`+datos.id+`', function(data){
   `;
     for(var out in datos.outputs.Name.connections){
        content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: data});`
     }
     content += `
});



// FIN INPUT TEXT
`;
return  content;
}
