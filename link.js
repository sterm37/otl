var ejs = require('ejs');
var fs = require('fs');
var svg = require('./board.js');

var template = fs.readFileSync('./template.ejs','utf8');

var action = {
	'/' : function(res){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(ejs.render(template,{
			script: '<a src="./client.js"></script>',
			title: 'testroom',
			boardsvg: svg.genBoard(50,2,5,8)
		}));
	}
}

function notfound(res){
	res.writeHead(404);
	res.end('Page Not Found');
}

module.exports = {
	urlhandler: function(path,res){
		if(action[path])
			action[path](res);
		else
			notfound(res);
	}
}