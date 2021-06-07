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

let x = 0;

let bodyes = [];

/*bodyes.push(new Body(new Rect(300, 120, 100, 100), 25));
bodyes.push(new Body(new Rect(200, 220, 60, 60), 15));*/
bodyes.push(new Body(new Circle(300, 120, 50), 25));
bodyes.push(new Body(new Circle(200, 220, 35), 15));
bodyes.push(new Body(new Circle(390, 230, 50), 25));
bodyes.push(new Body(new Circle(240, 320, 35), 15));
bodyes.push(new Body(new Circle(640, 520, 65), 150));

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
			if(body !== body2){
				collision(body, body2);
			}
		}
		mouse.tick((b = body) => {
			if(!mouse.clickPoint) return;
			let [x, y] = mouse.clickPoint;
			if(b.shape.checkPointIn(x, y))  mouse.connected = b;
		});
	}
	mouse.draw(g);
}

}