let shapes = {
	rect: 1,
	line: 2,
	circle: 3
};

let Rect = function(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.type = shapes.rect;
	
	
	Object.defineProperty(this, "centerX", {
		get() {
			return this.x + this.width / 2;
		}
	});
	Object.defineProperty(this, "centerY", {
		get() {
			return this.y + this.height / 2;
		}
	});
	
	this.draw = function(g, body){
		g.drawRect(this.x, this.y, this.width, this.height, body.fillColor, body.strokeColor);
		if(isFinite(body.m))g.drawText("m = " + body.m, body.shape.x+ 2, body.shape.y + 15, 15, "left");
	};
	
	this.checkPointIn = function(x, y){
		return pointInRect(x, y, this);
	};
};
let Circle = function(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.type = shapes.circle;
	
	this.centerX = this.x;
	this.centerY = this.y;
	
	this.draw = function(g, body){
		g.drawCircle(this.x, this.y, this.r, body.fillColor, body.strokeColor);
		g.drawText("m = " + body.m, body.shape.x, body.shape.y, 15, "center");
	};
	this.checkPointIn = function(x, y){
		return pointInCircle(x, y, this);
	};
};

let Line = function(x, y, x2, y2){
	
	this.x = x;
	this.y = y;
	this.x2 = x2;
	this.y2 = y2;
	
};

let Body = function(shape, m = 10){
	this.shape = shape;
	
	this.isStatic = isFinite(m) ? false : true;
	
	this.collided = new Set();
	
	this.fillColor = "#00b7ff";
	this.strokeColor = "white";
	
	this.vel = [0, 0];
	this.acl = [0, 0];
	this.m = m;
	
	this.tick = function(){
		if(this.isStatic) return;
		this.gravity();
		this.friction();
		let [vx, vy] = this.vel;
		shape.x += vx;
		shape.y += vy;
	}
	
	this.applyForce = function(f){
		this.acl = vecDivToNum(f, this.m);
		this.vel = vecPlusVec(this.vel, this.acl);
	};
	
	this.draw = function(g){
		if(this.collided.size > 0) {
			this.strokeColor = "green";
		}else{
			this.strokeColor = "white";
		}
		shape.draw(g, this);
	}
	
	this.mouseMoved = function(dist, vect){
		if(!isFinite(this.m)) return;
		this.applyForce(vecMultByNum(vect, dist)); 
	};
	
	this.friction = function(){
		let [vx, vy] = this.vel;
		let frictionCof = 0.15;
		let force = vecDivToNum(this.vel, distance(0, 0, vx, vy) < 0.001 ? 1 : distance(0, 0, vx, vy));
		force = vecMultByNum(force, frictionCof);
		this.vel = vecMinusVec(this.vel, force);
		if(Math.abs(this.vel[0]) < 0.1) this.vel[0] = 0;
		if(Math.abs(this.vel[1]) < 0.1) this.vel[1] = 0;
	}
	this.gravity = function(){
		let onGround = false;
		for(let b of this.collided){
			if(b.shape.y > this.shape.y) onGround = true;
		}
		if(!onGround && isFinite(this.m))this.vel = (vecPlusVec(this.vel, [0, 0.98]));
	};
};