process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const fs = require('fs');
const path = require('path');
const zipFolder = require('zip-folder');
var SerialPort = require("serialport");

const { spawn } = require('child_process');
var options = {
  key: fs.readFileSync('./server/ssl/privateKey.key'),
  cert: fs.readFileSync('./server/ssl/certificate.crt')
};


var server = require('https').Server(options, app);
var io = require('socket.io').listen(server);




const router = express.Router()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', port)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var johnny = spawn('nodejs', ['./server/script.js']);
johnny.stdout.on('data', function(data) {
    console.log(data.toString());
});
johnny.stdin.on("error", function (e)
{
    console.log("STDIN ON ERROR");
    console.log(e);
});
johnny.stderr.on('data', function(data) {
    console.log(data.toString());
});

// GET && POST
router.post('/saveflow', function(req, res, next) {
  io.sockets.emit("kill");


  fs.writeFile('./files/flow.json', JSON.stringify(req.body.datos), (err) => {
  if (err) throw err;
  var status = {}
  //var json = JSON.parse(status);
  fs.writeFile("./files/status.json", JSON.stringify(status),  (err) => { });

  var files = fs.readdirSync('./server/boards');

    for (const file of files) {
      if (file.indexOf('.js')>=0) {
        fs.unlinkSync(path.join('./server/boards', file), err => {
          if (err) throw err;
        });
      }
    }



  var boardslist = JSON.parse(fs.readFileSync('./files/boards.json', 'utf8')).boards;


  var datos = req.body.datos;

  var content = `
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { spawn } = require('child_process');
  const request = require('request');
  const io = require('socket.io-client');
  const socket = io('https://` + host + `:` + port+`', {rejectUnauthorized: false});
  var mosca = require('mosca');

  var settingsmosca = {
    port: 1883,
  };
  var moscaserver = new mosca.Server(settingsmosca);

  moscaserver.on('ready', function() {
  console.log('Mosca server is up and running');
  });

  `;
  for(var i=0; i < boardslist.length; i++ ){
    content += ` var board`+boardslist[i].name+` = spawn('nodejs', ['./server/boards/`+boardslist[i].name+`.js']);`;
      content += `board`+boardslist[i].name+`.stdout.on('data', function(data) {
                  console.log(data.toString());
              });
              board`+boardslist[i].name+`.stderr.on('data', function(data) {
                  console.log(data.toString());
              });`;
  }

  content += `
  socket.on('kill', function() {
    `
      for(var i=0; i < boardslist.length; i++ ){
          content += `board`+boardslist[i].name+`.kill();
          console.log("Kill board: `+boardslist[i].name+`")
            `;
      }
    content +=`

    })
  `;


  for(var node in datos){
    for(var nodeb in datos[node].data.nodes) {
      //content += node;
      if(datos[node].data.nodes[nodeb].data.board == null) {
        delete require.cache[require.resolve('./../modules/'+ datos[node].data.nodes[nodeb].name+'/server.js')];
        var t = require('./../modules/'+datos[node].data.nodes[nodeb].name+'/server.js');
        content += t.load(datos[node].data.nodes[nodeb], host, port, '');
      }
    }
  }


  fs.writeFile('./server/script.js', content, (err) => {   });




    for(var i=0; i < boardslist.length; i++ ){
      var content = `
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      const request = require('request');
      var five = require("johnny-five");
      var Firmata = require("firmata");
      var EtherPortClient = require('etherport-client').EtherPortClient;
      const io = require('socket.io-client');
      const socket = io('https://` + host + `:` + port+`', {rejectUnauthorized: false});

      var connection = 0;
      `;
      switch (boardslist[i].type) {
        case 'WIFI':
          content +=`
          var sp = new Firmata(new EtherPortClient({
                host: '`+boardslist[i].ip+`',
                port: '`+boardslist[i].port+`'
            }));

          sp.on("connect", function() {
            if(connection > 0 ) {
                console.log("Emit Ready: "+ connection)
                connection++;
                board.emit("ready");

            } else {
              connection++;
              //AUTO CONNECT PING
              setInterval(function(){ sp.sysexCommand([0]); }, 3000);
            }


          });

          var board = new five.Board(
            {
                id: "`+boardslist[i].name+`",
                io:  sp,
                  repl: false,
                  timeout: 1e5
            });
          `;
        break;
        case 'USB':
        content +=`
        var sp = new Firmata('`+boardslist[i].com+`');

        sp.on("connect", function() {
          if(connection > 0 ) {
              console.log("Emit Ready: "+ connection)
              connection++;
              board.emit("ready");

          } else {
            connection++;
            //AUTO CONNECT PING
            setInterval(function(){ sp.sysexCommand([0]); }, 3000);
          }


        });

        var board = new five.Board(
          {
              id: "`+boardslist[i].name+`",
              io:  sp,
                repl: false,
          });
        `;


        break;
        case 'RASPI':
        content +=`
        const Raspi = require('raspi-io');
        var board = new five.Board({
          io: new Raspi(),
          repl:false
        });
        `;
        break;

      }

      content +=`
      board.on("ready", function() {
        console.log("Ready Board ID: " + board.id);
        console.log("Connection: " + connection);
        socket.emit('ConnectBoard', {data: board.id });
        `;

        for(var node in datos){

          for(var nodeb in datos[node].data.nodes) {
            //content += node;
          if(datos[node].data.nodes[nodeb].data.board == boardslist[i].name) {
            delete require.cache[require.resolve('./../modules/'+ datos[node].data.nodes[nodeb].name+'/server.js')];
            var t = require('./../modules/'+datos[node].data.nodes[nodeb].name+'/server.js');
            content += t.load(datos[node].data.nodes[nodeb], host, port, boardslist[i].name);
          }

        }

      }

    content +=`
      });


      `;

      fs.writeFile('./server/boards/'+boardslist[i].name+'.js', content,  (err) => {

      });
    };



    res.json({ okey: "OK" });
    johnny.stdin.end();
    johnny.kill();
    johnny = spawn('nodejs', ['./server/script.js']);

    johnny.stdout.on('data', function(data) {
        console.log(data.toString());
    });

    johnny.stderr.on('data', function(data) {
        console.log(data.toString());
    });

  });

});

router.get('/restartboards', function(req,res,next){
    io.sockets.emit("kill");

  res.json({ okey: "OK" });
  setTimeout(function(){
  johnny.stdin.end();
  johnny.kill();

  johnny = spawn('nodejs', ['./server/script.js']);

  johnny.stdout.on('data', function(data) {
      console.log(data.toString());
  });

  johnny.stderr.on('data', function(data) {
      console.log(data.toString());
  });
}, 250);
});




router.get('/importflow', function(req, res, next) {


  var data = JSON.parse(fs.readFileSync('./files/flow.json', 'utf8'))
  res.json(data);

});
/*
router.post('/command', function(req, res, next) {
  //johnny.stdin.write("on()\n");
  var command = req.body.command;
  var dataread = req.body.data;
    if(command.indexOf("status") == 0) {
      fs.readFile('./files/status.json', function (err, data) {
        var text = command.substr(6);
        var json = JSON.parse(data)
          json[text] = dataread;
         fs.writeFile("./files/status.json", JSON.stringify(json), (error) => {  });

      });
    }
    io.sockets.emit(command, dataread);
    //io.sockets.emit('read'+child, dataread);

  console.log('LOG: '+command);
  //johnny.stdin.write('.'+command+"\n");

  //johnny.stdin.end();
  res.json({ okey: "OK" });


});

router.post('/statusid', function(req, res, next) {
  var data = JSON.parse(fs.readFileSync('./files/status.json', 'utf8'));
  data = data[req.body.id];
  res.json(data);
});
*/
router.get('/listboards', function(req, res, next) {
  var data = JSON.parse(fs.readFileSync('./files/boards.json', 'utf8')).boards;
  res.json(data);
});

router.get('/backup', function(req, res, next) {

  zipFolder('./files/', './backup.zip', function(err) {
    if(err) {
        console.log('oh no!', err);
    } else {
      res.download('./backup.zip');
    }
  });


});

router.get('/listcom', function(req, res, next) {
  SerialPort.list(function(error, list) {
    res.json(list);
  });
});


router.post('/saveboard', function(req, res, next) {
  var datos = req.body;
  fs.readFile('./files/boards.json', function (err, data) {
    var json = JSON.parse(data)
     console.log(json);
     json['boards'].push(datos);
     fs.writeFile("./files/boards.json", JSON.stringify(json))

  });

    res.json({ okey: "OK"});
  });

  router.post('/removeboard', function(req, res, next) {
    var datos = req.body.id;
    fs.readFile('./files/boards.json', function (err, data) {
      var json = JSON.parse(data);
       console.log(json);
       delete json['boards'].splice(datos, 1);
       fs.writeFile("./files/boards.json", JSON.stringify(json))

    });

  res.json({ okey: "OK"});
});

app.use('/', router);



// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  //app.listen(port, host)
  server.listen(port)
  console.log('Server listening on https://' + host + ':' + port) // eslint-disable-line no-console
}
start()


io.on('connection', function (socket) {

  socket.on('command', function(data){
    var command = data.command;
    var dataread = data.data;
      if(command.indexOf("status") == 0) {
        var text = command.substr(6);
        fs.readFile('./files/status.json', function (err, data) {

          var json = JSON.parse(data);
            json[text] = dataread;
           fs.writeFile("./files/status.json", JSON.stringify(json), (error) => { /* handle error */ });

        });
        command = "statusread"+text;
        //io.sockets.emit(command, dataread);
        socket.broadcast.emit(command,dataread);
      } else {
        io.sockets.emit(command, dataread);
      }

  });



  socket.on('statusid', function(data, fn){
    var datos = JSON.parse(fs.readFileSync('./files/status.json', 'utf8'));
    datos = datos[data.id];
    fn(datos);
    //io.sockets.emit("status"+data.id, {data: datos});
  });

  //socket.emit('ConnectBoard', {data: board.id });

socket.on('ConnectBoard', function(data){
  io.sockets.emit("BoardConnect", data);
});

});
