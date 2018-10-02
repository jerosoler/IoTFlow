exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA RELAY

var relay`+datos.id+` = new five.Relay({
  pin:`+datos.data.msg+`,
  type: '`+datos.data.type+`'

});

socket.on('read`+datos.id+`', function(data){
    switch (data) {
      case true:
          relay`+datos.id+`.open();
        break;
      case false:
          relay`+datos.id+`.close();
        break;
      case 'toggle':
          relay`+datos.id+`.toggle();
        break;
      default:

    }
});




// FIN RELAY
`;
return  content;
};
