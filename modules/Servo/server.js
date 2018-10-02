exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA SERVO

var servo`+datos.id+` = new five.Servo(`+datos.data.msg+`);





socket.on('read`+datos.id+`', function(data){
  if(Number.isInteger(data)) {
    if(data > 255) {
      data = 255;
    }
    if(data < 0) {
      data = 0;
    }

    servo`+datos.id+`.to(data);
  }
});




// FIN SERVO
`;
return  content;
};
