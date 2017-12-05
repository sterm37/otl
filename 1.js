function a(def){
	console.log(attr,'1')
	console.log(def,'2')
	var elements = [];
	var attr = {b: function(def){
		console.log(def,'3');
		elements.push(b(def));}};
	console.log(elements,'4')
	console.log(attr,'5')
	console.log(def,'6')
	def(attr);
	console.log(elements,'10')
	console.log(attr,'7')
	var attrs = Object.keys(attr).map(function(key){
		console.log(key,'11');
		var type = typeof attr[key];
		console.log(type,'12');
	})
	console.log(attr['b']['id'],'*****')
	console.log(def,'8')
	console.log(attr,'final_______')
}

function b(def){
	var attr = new Object();
	def(attr);
	console.log(attr,'9')
}

a(function(a){
	a.id = 'fucking';
	a.num = 150;
	a.b(function(what){
		what.id = 'fuck';
		what.num = 150;
	})
});
var t = [ "abc",  "def","ghi"];

console.log(t[0])

var attrs = Object.keys(t).map(function(key){
	console.log(key)
})

var d=10.6;

d=~~d;
console.log(d,'==============')