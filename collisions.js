
let collision = function(body1, body2, g){
	let shape1 = body1.shape;
	let shape2 = body2.shape;
	
	let collid = () => {
		body1.collided.add(body2);
		body2.collided.add(body1);
	};
	let discollid = () => {
		body1.collided.delete(body2);
		body2.collided.delete(body1);
	};
	
	if(shape1.type == shapes.rect && shape2.type == shapes.rect){
		let {x, y, width, height} = shape1;
		let {x: x2, y: y2, width: width2, height: height2} = shape2;
		
		if(x + width >= x2 && x <= x2 + width2 &&
			y + height >= y2 && y <= y2 + height2){
				collid();
		}else{
			discollid();
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
				collid();
			}
			
		}else{
			discollid();
		}
	}
	
	if(shape1.type == shapes.circle && shape2.type == shapes.rect){
		let {x, y, r} = shape1;
		let {x: rx, y: ry, width: rw, height: rh} = shape2;
		
		let nx = x;
		let ny = y;
		
		//if(x < rx) nx = rx;
		nx = (x < rx) ? rx : (x > rx + rw) ? rx + rw : x;
		ny = (y < ry) ? ry : (y > ry + rh) ? ry + rh : y;
		
		let dist = distance(x, y, nx, ny);
		
		if(dist <= r && dist > 0){
			
			let n = toUnitVector(x, y, nx, ny);
			
			let relVel = vecMinusVec(body2.vel, body1.vel);
			
			let velAlongNormal = dotProduct(relVel[0], relVel[1], n[0], n[1]);
			
			if(!(velAlongNormal > 0)){
				let j = -(1 + 0.8) * velAlongNormal;
				j /= (1 / body1.m) + (1 / body2.m);
				
				let impulse = vecMultByNum(n, j);
				body1.vel = vecMinusVec(body1.vel, vecMultByNum(impulse, (1 / body1.m)));
				body2.vel = vecPlusVec(body2.vel,  vecMultByNum(impulse, (1 / body2.m)));
				collid();
			}
		}else{
			discollid();
		}
		
		
	}
	
	if(shape1.type == shapes.rect && shape2.type == shapes.rect){
		
		let {x: x1, y: y1, width: w1, height: h1, centerX: cx1, centerY: cy1} = shape1;
		let {x: x2, y: y2, width: w2, height: h2, centerX: cx2, centerY: cy2} = shape2;
		
		
		if(x1 + w1 >= x2 &&
		   x1 <= x2 + w2 &&
		   y1 + h1 >= y2 &&
		   y1 <= y2 + h2){
			   
			   let nx = cx1;
			   let ny = cy1;
				nx = (cx1 < x2) ? x2 : (cx1 > x2 + w2) ? x2 + w2 : cx1;
				ny = (cy1 < y2) ? y2 : (cy1 > y2 + h2) ? y2 + h2 : cy1;
				
			   let n = toUnitVector(cx1, cy1, nx, ny);
			   
			   let relVel = vecMinusVec(body2.vel, body1.vel);
			   
			   let velAlongNormal = dotProduct(relVel[0], relVel[1], n[0], n[1]);
			   
			   if(!(velAlongNormal > 0)){
				let j = -(1 + 0.8) * velAlongNormal;
				j /= (1 / body1.m) + (1 / body2.m);
				
				let impulse = vecMultByNum(n, j);
				body1.vel = vecMinusVec(body1.vel, vecMultByNum(impulse, (1 / body1.m)));
				body2.vel = vecPlusVec(body2.vel,  vecMultByNum(impulse, (1 / body2.m)));
				collid();
			}
			   
		}else {
			discollid();
		}
		
	}
	
	return false;
};





















