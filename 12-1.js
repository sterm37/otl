// 모듈을 추출합니다.
var socketio = require('socket.io');      // 서버와 클라이언트간의 양방향 통신
var express = require('express');         // 서버와 미들웨어 생성
var http = require('http');               // 서버생성
var fs = require('fs');                   // 파일을 활용

// 변수를 선언합니다.
var seats = [
	[1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

// 웹 서버를 생성합니다.
var app = express();
var server = http.createServer(app);

// 라우트를 생성합니다.
app.get('/', function (request, response, next) {
	fs.readFile('12-6.html', function (error, data) {
		response.send(data.toString());
	});
});

app.get('/seats', function (request, response, next) {
	response.send(seats);
});

// 웹서버를 실행합니다.
server.listen(52273, function () {
	console.log('Server Running at http://127.0.0.1:52273');	
});

// 소켓 서버를 생성 및 실행합니다.
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
	socket.on('reserve', function (data) {
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);          // emit - 이벤트 생성
	});

	socket.on('reserveB', function (data) {
		seats[data.y][data.x] = 1;
		io.sockets.emit('reserveB', data);          // emit - 이벤트 생성
	});
});