exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA LED

var led`+datos.id+` = new five.Led(`+datos.data.msg+`);

socket.on('read`+datos.id+`', function(data){
  if(Number.isInteger(data)) {
    if(data > 255) {
      data = 255;
    }
    if(data < 0) {
      data = 0;
    }

    led`+datos.id+`.brightness(data);
  } else {
    switch (data) {
      case true:
          led`+datos.id+`.on();
        break;
      case false:
          led`+datos.id+`.off();
        break;
      case 'toggle':
          led`+datos.id+`.toggle();
      break;
      default:

    }
  }

});




// FIN LED
`;
return  content;
};
