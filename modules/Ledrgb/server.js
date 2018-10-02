exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA LED RGB

var led`+datos.id+` = new five.Led.RGB({ pins: {
    red: `+datos.data.msg+`,
    green: `+datos.data.msg2+`,
    blue: `+datos.data.msg3+`

  }
});

socket.on('read`+datos.id+`', function(data){
  if(Number.isInteger(data)) {
    if(data > 255) {
      data = 255;
    }
    if(data < 0) {
      data = 0;
    }

    led`+datos.id+`.intensity(data);
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

    var regex1 = /#[0-9A-Fa-f]{6}/g;
    switch (true) {
      case regex1.test(data):
      led`+datos.id+`.color(data);
      break;
    }

  }

});


// FIN LED RGB
`;
return  content;
};
