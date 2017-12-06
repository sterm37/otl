var latest_board;
var socket = io.connect('http://localhost:52273/');

socket.emit('test');
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
			display('Game Set(Draw)');
		else
			display('Game Set( '+ data.points[0] + '-' + data.points[1] +
				'winner: ' + toColor(data.winner) + ')');
	});
});

function sendHand(x,y){
	socket.emit('hand',[x,y]);
}

function display(message){
	$('#message').html(message);
}

function drawBoard(board){
	toDrawFormat(board).map(function(a){
		$('#stone' + a[0] + '-' + a[1]).attr('style','fill: '+toColor(a[2]));
	});
}

function highlightDiff(player,x,y){
	if(latest_board && getOccupant(latest_board,x,y) === 0){
		var diff = boardDiff(latest_board, hand(latest_board,player,x,y));
		diff.map(function(a){
			if(!(a[0]===x&&a[1]===y))
				$('#square'+a[0]+'-'+a[1]).attr('style','fill:red');
		});
	}
}

function highlightCleanup(){
	$('.square').attr('style','fill:green');
}

function clickbind(board,player){
	toDrawFormat(board).map(function(a){
		var x = a[0],y=a[1];
		var $square=$('#square'+x+'-'+y),$stone=$('#stone'+x+'-'+y);
		$square.click(function(){sendHand(x,y);});
		$stone.click(function(){sendHand(x,y);});
		$stone.mouseenter(function(){highlightDiff(player,x,y);});
		$stone.mouseleave(function(){ highlightCleanup(); });
	});
}