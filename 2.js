var a = [1,2,3,4];
console.log(a);

var re = a.reduce(function(a,b,c,d){
	console.log(a,b,c,d);
	return a=b;
},0);
console.log(re);