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

function nextPlayer(board,player){
	if(hands(board,anotherPlayer(player))>0)
		return anotherPlayer(player);
	else if(hands(board,player))
		return player;
	else
		return 0;
}

function anotherPlayer(player){
	return player % 2 + 1;
}

function winner(board){
	var winning_players = maxes([1,2],function(player){ return count(board,player);});
	if(winning_players.length>1)
		return 0;
	else
		return winning_players[0];
}

function count(board,player){
	return board.reduce(function(acc,occupant){
		return acc+(occupant === player ? 1 : 0);
	}, 0);
}

function hands(board,player){
	var hands = function(i){
		var point = indexToPoint(board,i);
		if(i>= square(board))
			return 0;
		else if(getOccupant(board,point[0],point[1]) === 0)
			return hands(i+1)+(handReverseNum(board,player,point[0],point[1])>0 ? 1 : 0);
		else
			return hands(i+1);
	};
	return hands(0);
}

function hand(board,player,x,y){
	return DIRECTIONS.reduce(function(reversed_board,direct){
		return handReverseDirection(reversed_board,player,x,y,direct[0],direct[1]);
	}, setPoint(board,player,x,y));
}

function setPoint(board,player,x,y){
	var copy = board.slice();
	copy[pointToIndex(board,x,y)] = player;
	return copy;
}

function handReverseDirection(board,player,x,y,dx,dy){
	var reverse = function(reversed_board,x,y){
		var occupant = getOccupant(reversed_board,x,y);
		if(occupant<=0)
			return board;
		if(occupant===player)
			return reversed_board;
		else
			return reverse(setPoint(reversed_board,player,x,y),x+dx,y+dy);
	};
	return reverse(board,x+dx,y+dy);
}

function handReverseNum(board,player,x,y){
	return DIRECTIONS.reduce(function(acc,direct){
		return acc+handReverseDirectionNum(board,player,x,y,direct[0],direct[1]);
	},0);
}

function handReverseDirectionNum(board,player,x,y,dx,dy){
	var distance = function(x,y,acc){
		var occupant = getOccupant(board,x,y);
		if(occupant<=0)
			return 0;
		if(occupant ==player)
			return acc;
		else
			return distance(x+dx,y+dy,acc+1);
	};
	return distance(x+dx,y+dy,0);
}

function toDrawFormat(board){
	return board.map(function(occupant,i){
		var point = indexToPoint(board,i),x=point[0],y=point[1];
		return [x,y,occupant];
	});
}

function boardDiff(before,after){
	var f = function(i,diff){
		if(i===before.length || i === after.length)
			return diff;
		else if(before[i] === after[i])
			return f(i+1,diff);
		else{
			var point = indexToPoint(before,i), x=point[0],y=point[1];
			diff.push([x,y,before[i],after[i]]);
			return f(i+1,diff);
		}
	};
	return f(0,[]);
}

function inSize(board,i){
	return 0<=i && i<size(board);
};

function pointToIndex(board,x,y){
	return x*size(board)+y;
}

function indexToPoint(board,index){
	return [~~(index / size(board)), index % size(board)];
}

function getOccupant(board,x,y){
	if(!inSize(board,x) || !inSize(board,y) )
		return -1;
	else
		return board[pointToIndex(board,x,y)];
}

function maxes(lst,f){
	var max = lst.reduce(function(max,elem){
		return Math.max(max,f(elem));
	},f(lst[0]));

	return lst.filter(function(elem){ return f(elem) === max; });
}

function toColor(player){
	if(player ===1)
		return 'white';
	else if(player == 2)
		return 'black';
	else
		return 'green';
}



module.exports = {
	BoardArray: BoardArray,
	size: size,
	nextPlayer: nextPlayer,
	anotherPlayer: anotherPlayer,
	winner: winner,
	count: count,
	hands: hands,
	hand: hand,
	setPoint: setPoint,
	handReverseDirection: handReverseDirection,
	handReverseNum: handReverseNum,
	handReverseDirectionNum: handReverseDirectionNum,
	toDrawFormat: toDrawFormat,
	boardDiff: boardDiff,
	inSize: inSize,
	pointToIndex: pointToIndex,
	indexToPoint: indexToPoint,
	getOccupant: getOccupant,
	maxes: maxes,
	toColor: toColor
};