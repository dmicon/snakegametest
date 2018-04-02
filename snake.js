/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const dead = new Audio ();
const eat = new Audio ();
const up = new Audio ();
const left = new Audio ();
const right = new Audio ();
const down = new Audio ();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

let snake = [];
snake[0] = {
	x: 9 * box, 
	y: 10 * box
	};

let food = {
	x: Math.floor (Math.random() * 17 + 1) * box,
	y: Math.floor (Math.random() * 15 + 3) * box
	};
	
let score = 0;

let d;

document.addEventListener("keydown",direction);
function direction(event) {
	if (event.keyCode == 37 && d != "right"){
		left.play();
		d = "left";
		}
	else if (event.keyCode == 38 && d != "up"){
		up.play();
		d = "up";
		}
	else if (event.keyCode == 39 && d != "left"){
		right.play();
		d = "right";
		}
	else if (event.keyCode == 40 && d != "down"){
		down.play();
		d = "down";
		}
		console.log(event.keyCode, d);
	}
	
function collision(head,array) {
	for(let i = 0; i < array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y) {
			return false;
			}
		}
	return true;
	}

function draw(){
	ctx.drawImage(ground,0,0);
	for(let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0) ? "green":"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
		}
	ctx.drawImage(foodImg,food.x,food.y);
	
	//old head position check 
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	console.log(snakeX,snakeY);
	
	if (d == "left") snakeX -= box;
	if (d == "right") snakeX += box;
	if (d == "down") snakeY += box;
	if (d == "up") snakeY -= box;
	
	if (snakeX == food.x && snakeY == food.y) {
		eat.play ();
		score++;
		food = {
		x: Math.floor (Math.random() * 17 + 1) * box,
		y: Math.floor (Math.random() * 15 + 3) * box
		};
	} else {
		snake.pop();
		}
		
	let newHead = {x:snakeX, y:snakeY}
	snake.unshift(newHead);
	
	if(snakeX < box || snakeY < 3*box || snakeX > 17*box || snakeY > 17*box || collision(newHead,snake)) {
		dead.play ();
		clearInterval(game);
	}
	
	ctx.fillStyle = "white";
	ctx.font = "45pz Changa One";
	ctx.fillText(score, 2*box, 1.6*box);
	}

let game = setInterval (draw, 100);










