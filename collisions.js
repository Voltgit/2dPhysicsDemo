
let collision = function(body1, body2){
	let shape1 = body1.shape;
	let shape2 = body2.shape;
	
	let collect = () => {
		body1.collided.add(body2);
		body2.collided.add(body1);
	};
	let disCollect = () => {
		body1.collided.delete(body2);
		body2.collided.delete(body1);
	};
	
	if(shape1.type == shapes.rect && shape2.type == shapes.rect){
		let {x, y, width, height} = shape1;
		let {x: x2, y: y2, width: width2, height: height2} = shape2;
		
		if(x + width >= x2 && x <= x2 + width2 &&
			y + height >= y2 && y <= y2 + height2){
				collect();
		}else{
			disCollect();
		}
	}
	
	if(shape1.type == shapes.circle && shape2.type == shapes.circle){
		
		
		let {x, y, r} = shape1;
		let {x: x2, y: y2, r: r2} = shape2;
		
		let dist = distance(x, y, x2, y2);
		if(dist <= r + r2){
			let n = toUnitVector(x, y, x2, y2);
			
			let relVel = vecMinusVec(body2.vel, body1.vel);
			
			let velAlongNormal = dotProduct(relVel[0], relVel[1], n[0], n[1]);
			
			if(!(velAlongNormal > 0)){
				let j = -(1 + 1) * velAlongNormal;
				j /= (1 / body1.m) + (1 / body2.m);
				
				let impulse = vecMultByNum(n, j);
				body1.vel = vecMinusVec(body1.vel, vecMultByNum(impulse, (1 / body1.m)));
				body2.vel = vecPlusVec(body2.vel,  vecMultByNum(impulse, (1 / body2.m)));
				collect();
			}
			
		}else{
			disCollect();
		}
	}
	
	return false;
};