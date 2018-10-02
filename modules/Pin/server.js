exports.load = function(datos, host, port, board) {
var content;
content += `
// EMPIEZA PIN

var pin`+datos.id+` = new five.Pin(`+datos.data.msg+`);

socket.on('read`+datos.id+`', function(data){
    switch (data) {
      case true:
          pin`+datos.id+`.high();
        break;
      case false:
          pin`+datos.id+`.low();
        break;
      default:

    }
});




// FIN PIN
`;
return  content;
};
