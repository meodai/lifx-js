var LifxClient = require('node-lifx').Client;
var client = new LifxClient();

var http = require('http');
var url = require('url');
var fs = require('fs');
var jade = require('jade');
var chroma = require('chroma-js');

/* create a simple HTTP server */
var server = http.createServer(function(request, response){
  console.log('Connection');
  var path = url.parse(request.url).pathname;
  var html = jade.renderFile(__dirname + '/html/index.jade');

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(html, "utf8");
  response.end();
});

server.listen(8001);
var io = require('socket.io')(server);
/* init sockets */
var ioServer = io.listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('color change', function(color){
    console.log('new color: ' + color);
    changeLights(color);
  });
});


/* lifx shizzle */
client.on('error', function(err) {
  console.log('LIFX error:\n' + err.stack);
  client.destroy();
});

client.on('light-new', function(light) {
  console.log('New light found. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
  changeLights();
});

function changeLights (color) {
  if (color){
    var hsl = chroma(color).hsl();
  }

  client.lights().forEach(function(light){
    if (color){
      client.light(light.id).color(hsl[0], hsl[1] * 100, hsl[2] * 100, 9000);
    }else{
      client.light(light.id).color(360, 30, 20, 9000, 10000);
    }
  })
};


client.init();