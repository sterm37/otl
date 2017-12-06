function a(def){
	var elements = [];
	var attr = {
		b: function(def){elements.push(b(def));},
		c: function(def){elements.push(c(def));}
		}
	console.log(5);
	def(attr);
	console.log()
	return attr;
}

function b(def){
	var attr = new Object();
	def(attr);
	console.log(6);
	return attr;
}

function c(def){
	var attr = new Object();
	def(attr);
	console.log(attr,7);
	return attr;
}

a(function(test){
	console.log(1);
	test.id = 'test';
	test.num = 0;
	console.log(2);
	test.b(function(test1){
		test1.id= 'test1';
		test1.num=1;
		console.log(3)
	});
	console.log(4);
	test.c(function(test2){
		test2.id='test2';
		test2.num=2;
	});
});


console.log(a);