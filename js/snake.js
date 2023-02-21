var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");

/* Creating a unit */
const box = 32;

/* Load image */
const ground = new Image();
ground.src = "img/ground3.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

/* Creating image */
let snake = [];

snake[0] = {
    x: 9*box,
    y: 10*box,
}

/* Creating food */
let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box,
}

let score = 0;

let d;
document.addEventListener('keydown', function(e){
    console.log(e);
    if (e.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if(e.keyCode == 38 && d != "DOWN"){
        d = "UP";
    } else if(e.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(e.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }
});

/* Collision function */
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.drawImage(ground, 0, 0);

    /* Draw of our snake */
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "brown";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    /* Draw of food */
    ctx.drawImage(foodImg, food.x, food.y);

    /* Old head */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* Giving directions */
    if (d == "LEFT")snakeX -= box;
    if (d == "UP")snakeY -= box;
    if (d == "RIGHT")snakeX += box;
    if (d == "DOWN")snakeY += box;

    /* After eating the food */
    if (snakeX == food.x && snakeY == food.y) {
        score ++;
        food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box,
        };
    } else {
        snake.pop();
    }

    /* New head */
    let newHead = {
        x:snakeX,
        y:snakeY,
    }

    /* Game over */
    if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
    }

    /* Shifting head */
    snake.unshift(newHead);


    /* Creating the score */
    ctx.fillStyle = "white"
    ctx.font = "45px Arial";
    ctx.fillText(score, 2*box, 1.6*box);
}

let game = setInterval(draw, 200);