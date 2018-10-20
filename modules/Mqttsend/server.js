exports.load = function(datos, host, port, board) {
  var content;

  content += `

  socket.on('read`+datos.id+`', function(data){

    var message = {
    topic: '`+datos.data.msg+`',
    payload: '`+datos.data.msg2+`', // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
    };
    moscaserver.publish(message, function() { });



  });

  `;
  return  content;
}
