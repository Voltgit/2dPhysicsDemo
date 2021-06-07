function distance(x1, y1, x2, y2){
	let x = Math.min(x1, x2);
	let y = Math.min(y1, y2);
	
	x2 = Math.max(x1, x2);
	y2 = Math.max(y1, y2);
	return Math.sqrt((x2 - x)**2 + (y2 - y)**2);
}

function vecDivToNum(vec, n){
	return [vec[0] / n, vec[1] / n];
}

function vecMultByNum(vec, n){
	return [vec[0] * n, vec[1] * n];
}

function vecPlusVec(vec, vec2){
	return [vec[0] + vec2[0], vec[1] + vec2[1]];
}
function vecMinusVec(vec, vec2){
	return [vec[0] - vec2[0], vec[1] - vec2[1]];
}

function vecDivToVec(vec, vec2){
	return [vec[0] / vec2[0], vec[1] / vec2[1]];
}

function vecMultToVec(vec, vec2){
	return [vec[0] * vec2[0], vec[1] * vec2[1]];
}

function toUnitVector(x1, y1, x2, y2){
	let dist = distance(x1, y1, x2, y2);
	return  [(x2 - x1) / dist
			,(y2 - y1) / dist];
}

function pointInRect(x, y, rect){
	if(x > rect.x && x < rect.x + rect.width &&
	   y > rect.y && y < rect.y + rect.height) return true;
	return false
}

function pointInCircle(x, y, circle){
	
	if(distance(x, y, circle.x, circle.y) < circle.r) return true;
	return false
}

function dotProduct(x1, y1, x2, y2){
	return (x1 * x2 + y1 * y2);
}/*
function dotProduct(vec1, vec2){
	let [x1, y1] = vec1;
	let [x2, y2] = vec2;
	return dotProduct(x1, y1, x2, y2);
}*/