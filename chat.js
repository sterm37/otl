$(document).ready(function(){
	var player;
	var socket = io.connect('http://localhost:52273/');
	socket.emit('test','chat')

	socket.on('m',function(data){
		var output = '';
		output +='<li>';
		output +='<p>'+data.name+'</p></span>';
		output +=	'<h4>'+data.send+'</h4>';
		output +='</li>';

		$(output).prependTo('#content');
	});

	$('button').click(function(){
		socket.emit('m',{
			name:$('#name').val(),
			send:$('#send').val()
		});
	});
});
