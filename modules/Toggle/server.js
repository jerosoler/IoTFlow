
exports.load = function(datos, host, port) {
var content;
content += `
// EMPIEZA TOOGLE


socket.on('read`+datos.id+`', function(data){
   `;
     for(var out in datos.outputs.Name.connections){
        content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: 'toggle'});`
     }
     content += `
});



// FIN TOOGLE
`;
return  content;
}
