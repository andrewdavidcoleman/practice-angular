var express = require('express');
var app = express();
var http = require('http');
var debug = require('debug');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('lodash');
var appRoot = '/app';
//var favicon = require('serve-favicon');

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


app.use(express.static(path.join(__dirname, 'app')));

app.get('/',function(req,res){
     res.sendFile('./app/index.html');
});


app.get('*.js', function (req, res) {
    res.sendFile(__dirname + appRoot + req.originalUrl);
});


app.get('*.html', function(req, res) {
  res.sendFile(__dirname + appRoot + req.originalUrl);
});

app.get('*.css', function(req, res) {
	console.log(req.originalUrl);


	res.sendFile(__dirname + appRoot + req.originalUrl);
});


module.exports = app;
