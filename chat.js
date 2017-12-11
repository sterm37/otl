$(document).ready(function(){
	var player;
	var i = 0;
	var socket = io.connect('http://localhost:52273/');

	socket.on('col',function(data){
		player[i] = data;
		i++
	})

	socket.on('m',function(data){
		var output = '';
		output +='<li>';
		output +='<font size"2em" color = "'+player+'">'+data.name+'</font>';
		output +=	'<h5>'+data.send+'</h5>';
		output +='</li>';
		$(output).prependTo('#content');
		$('#send').val("");
	});
	$('button').click(function(){
		socket.emit('m',{
			name:$('#name').val(),
			send:$('#send').val()
		});
	});
});
