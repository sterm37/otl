var DIRECTIONS = [[0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1]];

function BoardArray(size){
	var square = size * size;
	var initial = function(index){
    	switch(index){
		case square / 2 - size / 2 - 1:
			return 1;
		case square / 2 - size / 2:
			return 2;
		case square / 2 + size / 2 - 1:
			return 2;
		case square / 2 + size / 2:
			return 1;
		default:
			return 0;
      	}
	};
	var genList = function(index){
		if(index === square)
			return [];
		else
			return [initial(index)].concat(genList(index+1));
	};
	return genList(0);
}

function size(board){
	return Math.sqrt(square(board));
}

function square(board){
	return board.length;
}

module.exports = {
	BoardArray: BoardArray,
	size: size,
	square: square
};