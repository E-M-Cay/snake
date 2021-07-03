document.addEventListener("DOMContentLoaded", function () {
    startGame();
})


let snakeBody = [
    /*{
        x: 0,
        y: 0,
        place: 1
    },
    {
        x: 20,
        y: 0,
        place: 2
    },
    {
        x: 40,
        y: 0,
        place: 3
    }*/
];

function createBoard(canvas, context, snake){
    let rowNbr = canvas.width / snake.size;
    let colNbr = canvas.height / snake.size;
    let board = [];

    for (let i = 0; i < rowNbr; i++){
        for (let j = 0; j < colNbr; j++){
            board.push({
                        x:      j * snake.size,
                        y:      i * snake.size,
                        bonus:  "",
                        });
        }
    }
    return (board);
}

function fillBoard(canvas, context, snake, board){
    let random;
    for (let i = 0; i < board.length; i++){
        random = Math.floor(Math.random() * 11);
        switch(random){
            case(0):
            board[i].bonus = "";
            break;
            case(1):
            board[i].bonus = "apple";
            break;
            case(2):
            board[i].bonus = "bomb";
            break;
        }
    }
}

function drawBoard(ctx, snake, board){
    ctx.strokeStyle = "black";
    for (let i = 0; i < board.length; i++){
        switch (board[i].bonus) {
            case "":
                ctx.strokeRect(board[i].x, board[i].y, snake.size, snake.size);
            break;
            case "apple":
                ctx.fillStyle = "red";
                ctx.fillRect(board[i].x, board[i].y, snake.size, snake.size);
                ctx.strokeRect(board[i].x, board[i].y, snake.size, snake.size);
                break;
        
            default:
                break;
        }
    }
}

function startGame() {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const snake = new Snake(15, 10, c, ctx, "#0000FF");

    snake.createSnakeBody();
    let board = createBoard(c, ctx, snake);
    fillBoard(c, ctx, snake, board);
    console.table(board);
    drawBoard(ctx, snake, board);
    moveSnake(ctx, snake, board);
   // console.log(snakeBody)
}

function findAt(position) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i].place === position) {
            return (snakeBody[i]);
        }
    }
    return (null);
}

function addElement(posX, posY) {
    snakeBody.splice(snakeBody.length - 1);
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].place++;
        //console.table(snake.body);
    }
    snakeBody.unshift({ x: posX, y: posY, place: 1 });
}

function moveSnake(ctx, snake, board) {
    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case 'ArrowLeft':
                addElement(findAt(1).x - snake.size, findAt(1).y);
                break;
            case 'ArrowUp':
                addElement(findAt(1).x, findAt(1).y - snake.size);
                break;
            case 'ArrowRight':
                addElement(findAt(1).x + snake.size, findAt(1).y);
                break;
            case 'ArrowDown':
                addElement(findAt(1).x, findAt(1).y + snake.size);
                break;
            default:
                console.log(event);
        }
        snake.update();
        drawBoard(ctx, snake, board);
    })
}


class Snake {
    constructor(length, size, canvas, ctx, color) {
        this.length = length;
        this.size = size;
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "black";
        snakeBody.forEach(element => {  this.ctx.fillRect(element.x, element.y, this.size, this.size);
                                        this.ctx.strokeRect(element.x, element.y, this.size, this.size)
                                     });
    }
    createSnakeBody(){
        for (let i = 0; i < this.length; i++) {
            snakeBody.push({
                x: this.size*i,
                y: 0,
                place: i+1
            })
        }
        this.draw();
    }
    update() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();  
    }
}