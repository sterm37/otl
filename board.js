
/*초록색 네모크기, 중간 검은색줄 두께, 바깥 검은색 두꼐, 보드 가로세로 칸갯수  */
function genBoard(SQUARE_SIZE, GRID_SIZE,OUT_BOARDER,BOARD_SIZE){
	return svg(function(svg){
		svg.width  = SQUARE_SIZE * BOARD_SIZE + GRID_SIZE * (BOARD_SIZE - 1) + OUT_BOARDER * 2;
		svg.height = svg.width;

		svg.rect(function(rect){
			rect.width = svg.width;
			rect.height = svg.width;
			rect.x = 0;
			rect.y = 0;
			rect.i = -1;
			rect.j = -1;
			rect.style = "fill:black"
		});
		for(var i = 0;i<BOARD_SIZE;i++){
			for(var j = 0;j<BOARD_SIZE;j++){
				svg.rect(function(rect){
					rect['class']='square';
					rect.id='square' + i + '-' + j
					rect.width = SQUARE_SIZE;
					rect.height = SQUARE_SIZE;
					rect.x = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * i;
					rect.y = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * j;
					rect.i = i;
					rect.j = j;
					rect.style = "fill:green";
				});
			}
		}

		for(var i=0;i<BOARD_SIZE;i++){
			for(var j=0;j<BOARD_SIZE; j++){
				svg.circle(function(circle){
					circle.id= 'stone' + i + '-' + j
					circle.cx = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * i + SQUARE_SIZE / 2;
					circle.cy = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * j + SQUARE_SIZE / 2;
					circle.r = (SQUARE_SIZE - 8) / 2;
					circle.style = 'fill:green';
				});
			}
		}

		for(var i=0;i<BOARD_SIZE;i++){
			for(var j=0;j<BOARD_SIZE;j++){
				svg.circle(function(gcircle){
					gcircle.id='guide_stone' + i + '-' + j
					gcircle.cx = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * i + SQUARE_SIZE / 2;
					gcircle.cy = OUT_BOARDER + (SQUARE_SIZE + GRID_SIZE) * j + SQUARE_SIZE / 2;
					gcircle.r = (SQUARE_SIZE - 34 ) / 2;
					gcircle.style = 'fill:green';
				});
			}
		}
	}).toString();/*수를 문자열로 리턴 */
}

function rect(def){
	var attr = new Object();
	def(attr);
	return { toString : function(){ return tag('rect',2,attr); }};
}

function circle(def){
	var attr = new Object();
	def(attr);
	return { toString : function(){ return tag('circle',2,attr); }};
}

function svg(def){
	var elements = [];
	var attr = {
		rect: function(def){ elements.push(rect(def)); },
		circle: function(def){elements.push(circle(def)); },
		gcircle: function(def){elements.push(gcircle(def)); }
	};

	def(attr);
	return {toString: function(){
		return tag('svg',0,attr) + 
		elements.reduce(function(acc,elem){return acc+elem.toString(); }, '') + 
		tag('svg',1);
	}};
}

function tag(tag_name,type,attr){
	var close = (type === 1 ? '/' : '');
	var single = (type === 2 ? '/' : '');

	if(attr)
		var attrs=Object.keys(attr).map(function(key){
			var type = typeof attr[key];
			if(type === 'string' || type ==='number')
				return ' ' + key + '="' + attr[key] + '"';
			else
				return '';
		});
	else
		var attrs = [];
	return '<' + close + tag_name + attrs.join('') + single + '>';
}

module.exports = {
	genBoard : genBoard,
	rect: rect,
	circle: circle,
	svg: svg,
	tag: tag
};