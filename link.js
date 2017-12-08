var ejs = require('ejs');
var fs = require('fs');
var svg = require('./board.js');

var squad =50 ;
var grid =2 ;
var border =5 ;
var size =8 ;

var template = fs.readFileSync('./template.ejs','utf8');

var action = {
	'/' : function(res){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(ejs.render(template,{
			script: '<script src="/client.js"></script>',
			title: 'testroom',
			boardsvg: svg.genBoard(squad,grid,border,size),
			chat: '<script src="/chat.js"></script>',
			hei : squad * size + grid * (size - 1) + border * 2,
			message: 'Waiting....'
		}));
	},
	'/client.js' : function(res){
		fs.readFile(__dirname + '/client.js',function(err,data){
			if(err)
				return servererror(res);
			res.writeHead(200,{'Content-Type': 'text/javascript'});
			res.end(data);
		});
	},
	'/chat.js' : function(res){
		fs.readFile(__dirname + '/chat.js',function(err,data){
			if(err)
				return servererror(res);
			res.writeHead(200,{'Content-Type': 'text/javascript'});
			res.end(data);
		});
	},
	'/othello.js' : function(res){
		fs.readFile(__dirname + '/othello.js',function(err,data){
			if(err)
				return servererror(res);
			res.writeHead(200,{'Content-Type': 'text/javascript'});
			res.end(data);
		});
	}

}


function notfound(res){
	res.writeHead(404);
	res.end('Page Not Found');
}

function servererror(res){
	res.writeHead(500);
	res.end('js File error');
}

module.exports = {
	urlhandler: function(path,res){
		if(action[path])
			action[path](res);
		else
			notfound(res);
	}
}