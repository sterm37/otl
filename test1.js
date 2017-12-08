var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request,response){
	fs.readFile('1.html',function(error,data){
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.end(data);
	});
}).listen(52273,function(){
	console.log('Server Running');
});

var io = socketio.listen(server);
io.sockets.on('connection',function(socket){
	console.log('start')
	socket.on('c',function(){
		console.log('sss');
	});
	socket.on('m',function(data){
		io.sockets.emit('m',data);
	});
})