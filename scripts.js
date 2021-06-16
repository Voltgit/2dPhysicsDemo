const WIDTH = 800;
const HEIGHT = 600;
const FPS = 60;
const delayTime = 1000 / FPS;

const canvas = document.getElementById("physics-demo");

{
let g = new Graphics();

canvas.addEventListener("mousemove", (e) => {mouse.setPos(canvas, e)});
canvas.addEventListener("mousedown", (e) => {mouse.down(e)});
canvas.addEventListener("mouseup", 	 (e) => {mouse.up(e)});

document.getElementById("rect").addEventListener("click", (e) => {
	bodyes.push(new Body(new Rect(rand(10, WIDTH - 10), 150, rand(10, 75), rand(10, 75)), rand(10, 20)));
});
document.getElementById("circle").addEventListener("click", (e) => {
	bodyes.push(new Body(new Circle(rand(10, WIDTH - 10), 150, rand(10, 75), rand(10, 20))));
});

let x = 0;

let bodyes = [];

bodyes.push(new Body(new Rect(0, 0, WIDTH - 10, 5), Infinity));
bodyes.push(new Body(new Rect(WIDTH - 5, 0, WIDTH, HEIGHT - 10), Infinity));
bodyes.push(new Body(new Rect(0, HEIGHT - 5, WIDTH - 5, HEIGHT), Infinity));
bodyes.push(new Body(new Rect(0, 10, 5, HEIGHT - 20), Infinity));
bodyes.push(new Body(new Rect(300, 250, 40, 40), Infinity));
bodyes.push(new Body(new Circle(300, 120, 50), 25));
bodyes.push(new Body(new Circle(200, 220, 35), 15));
bodyes.push(new Body(new Circle(390, 230, 50), 25));
bodyes.push(new Body(new Rect(240, 320, 35, 35), 15));
bodyes.push(new Body(new Rect(200, 500, 200, 25), Infinity));
bodyes.push(new Body(new Circle(640, 520, 65), 1550));

setInterval(draw, delayTime);
setInterval(tick, delayTime);

function tick(){
	for(let body of bodyes){
		body.tick();
	}
}

function draw(){
	g.clear();
	for(let body of bodyes){
		body.draw(g);
		for(let body2 of bodyes){
			if(body !== body2 && !body.isStatic){
				collision(body, body2, g);//DELETE g
			}
		}
		mouse.tick((b = body) => {
			if(mouse.clickPoint){
				let [x, y] = mouse.clickPoint;
				if(b.shape.checkPointIn(x, y))  mouse.connected = b;
			}
			if(mouse.shiftPressed && !this.connected){
				let [x, y] = mouse.pos;
				if(b.shape.checkPointIn(x, y))  mouse.connected = b;
			}
		});
	}
	mouse.draw(g);
}

}