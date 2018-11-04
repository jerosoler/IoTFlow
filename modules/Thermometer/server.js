exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA Thermometer

var pin`+datos.id+` = new five.Thermometer({
  controller: '`+datos.data.controller+`'
  `;
  if(datos.data.controller == "LM35" || datos.data.controller == "TMP36" || datos.data.controller == "DS18B20") {
  content += `
  ,
  pin: '`+datos.data.msg+`'
  `;
  }
  content+= `

});


pin`+datos.id+`.on("change", function() {
  `;
    for(var out in datos.outputs.Name.connections){
       content += `socket.emit('command', {command:"read"+`+datos.outputs.Name.connections[out].node+`, data: this.celsius});`
    }
    content += `

});


// FIN Thermometer
`;
return  content;
};
