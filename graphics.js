const Graphics = function(){
	let g = canvas.getContext("2d");
	
	this.drawRect = function(x, y, width = 100, height = 100, 
				fillColor = "#00b7ff", strokeColor = "green", lineWidth = 3){
		g.beginPath();
		g.rect(x, y, width, height);
		g.fillStyle = fillColor;
		g.strokeStyle = strokeColor;
		g.lineWidth = lineWidth;
		g.fill();
		if(strokeColor) g.stroke();
		g.closePath();
	};
	
	this.drawCircle = function(x, y, r, fillColor = "#00b7ff", strokeColor = "green", lineWidth = 3){
		g.beginPath();
		g.arc(x, y, r, 0, Math.PI * 2);
		g.fillStyle = fillColor;
		g.strokeStyle = strokeColor;
		g.lineWidth = lineWidth;
		g.fill();
		if(strokeColor) g.stroke();
		g.closePath();
	};
	
	this.drawLine = function(x, y, x2, y2, color = "red", lineWidth = 3){
		g.beginPath();
		g.moveTo(x, y);
		g.lineTo(x2, y2);
		g.strokeStyle = color;
		g.lineWidth = lineWidth;
		g.stroke();
		g.closePath();
	};
	this.drawText = function(text, x, y, size = 25, textAlign = "left", color = "white") {
		g.beginPath();
		g.font = size + "px Arial";
		g.fillStyle = color;
		g.textAlign = textAlign;
		g.fillText(text, x, y);
		g.closePath();
	};
	this.clear = function(){
		g.clearRect(0, 0, WIDTH, HEIGHT);
	};
};

let mouse = new function(){
	this.pos = [0, 0];
	this.pressed = false;
	
	this.clickPoint = false;
	
	this.connectet = false;
	
	this.down = function(e){
		this.pressed = true;
		this.clickPoint = this.pos;
	};
	
	this.up = function(e){
		this.pressed = false;
		if(this.connected){
			let [x, y] = this.clickPoint;
			let [x2, y2] = this.pos;
			this.connected.mouseMoved(distance(x, y, x2, y2), toUnitVector(x2, y2, x, y));
			this.connected = false;
		}
		this.clickPoint = false;
	};
	
	this.tick = function(f){
		f(); 
	};
	this.draw = function(g){
		if(this.clickPoint){
			let [x, y] = this.clickPoint;
			let [x2, y2] = this.pos;
			g.drawLine(x, y, x2, y2);
			g.drawCircle(x, y, 5, this.connected ? "green" : "blue", false);
			g.drawCircle(x2, y2, 5, "blue", false);
		}
	};
	this.setPos = function(canvas, e){
		let rect = canvas.getBoundingClientRect();
		this.pos = [e.clientX - rect.left,
					e.clientY - rect.top];
	};
};