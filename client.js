var latest_board;
var socket = io.connect('http://localhost:52273/');

socket.emit('enter');
socket.on('accept',function(data){
	var player = data.player;
	clickbind(data.board, player);

	socket.on('board', function(data){
		latest_board = data.board;
		drawBoard(data.board);
		display('Turn: ' + toColor(data.turn) + ' (' + 'Stone Color: ' + 
			toColor(player) + ')')
	});

	socket.on('game end',function(data){
		if(data.winner === 0)
			display('')
	})

});

function display(message){
	$('#message').html(message);
}