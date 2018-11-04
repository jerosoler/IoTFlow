exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA PIEZO

var pin`+datos.id+` = new five.Piezo(`+datos.data.msg+`);
var play`+datos.id+` = 0;

function sound`+datos.id+`() {
  if(play`+datos.id+` == 0) {
    pin`+datos.id+`.off();
  } else {
    pin`+datos.id+`.frequency(587, 1000);
  }
}

setInterval(sound`+datos.id+`, 2000);

socket.on('read`+datos.id+`', function(data){

    switch (data) {
      case true:
          play`+datos.id+` = 1;
        break;
      case false:
          play`+datos.id+` = 0;
        break;
      default:

  }

});




// FIN PIEZO
`;
return  content;
};
