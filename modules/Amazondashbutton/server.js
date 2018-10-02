
exports.load = function(datos, host, port) {
var content;
content += `
// EMPIEZA AMAZON DASH BUTTON

var dash_button = require('node-dash-button');


var dash`+datos.id+` = dash_button("`+datos.data.msg+`", null, null, 'all'); //address from step above
dash`+datos.id+`.on("detected", function (){
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: 'toggle'});`
    }
    content += `
});





// FIN AMAZON DASH BUTTON
`;
return  content;
}
