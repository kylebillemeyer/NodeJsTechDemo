
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var dgram = require('dgram');


/**
 * Set up Express web server.
 */
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


/**
 * Set up socket io port
 */
var server = http.createServer(app);
var io = socketio.listen(server);
io.on('connection', function(socket){
    console.log('Connected: ' + socket);
    socket.on('player join', function(data){
        console.log('User joined game: ' + data.timestamp);
    });
});
io.on('disconnect', function(data){
    console.log('Disconnected: ' + data);
});

var socket = dgram.createSocket('udp4');



/**
 * Fire it up!
 */
socket.bind(2999, function(){
    console.log('Dgram UDP4 socket on port 2999');
});
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



