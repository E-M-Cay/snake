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

let board = [];
console.log(board)
/*function createBoard(canvas, context, snake) {
    let rowNbr = canvas.width / snake.size;
    let colNbr = canvas.height / snake.size;
    let board = [];



    for (let i = 0; i < colNbr; i++) {
        for (let j = 0; j < rowNbr; j++) {
            board.push({
                x: j * snake.size,
                y: i * snake.size,
                bonus: "",
            });
        }
    }
    return (board);
}*/

/*function fillBoard(canvas, context, snake, board) {
    console.log(board)
    let random;
    for (let i = 0; i < board.length; i++) {
        random = Math.floor(Math.random() * 11);
        switch (random) {
            case (0):
                board[i].bonus = "apple";
                break;
            case (1):
                board[i].bonus = "bomb";
                break;
            default:
                board[i].bonus = "";
                break;
        }
    }
}*/

/*function drawBoard(ctx, snake, board) {
    ctx.strokeStyle = "black";
    for (let i = 0; i < board.length; i++) {
        switch (board[i].bonus) {
            case "":
                ctx.strokeRect(board[i].x, board[i].y, snake.size, snake.size);
                break;
            case "apple":
                ctx.fillStyle = "red";
                ctx.fillRect(board[i].x, board[i].y, snake.size, snake.size);
                ctx.strokeRect(board[i].x, board[i].y, snake.size, snake.size);
                break;
            case "bomb":
                ctx.fillStyle = 'black';
                ctx.fillRect(board[i].x, board[i].y, snake.size, snake.size);
                ctx.strokeRect(board[i].x, board[i].y, snake.size, snake.size);
            default:
                break;
        }
    }
}*/

function startGame() {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const snake = new Snake(15, 10, c, ctx, "#0000FF");

    snake.createSnakeBody();
    //console.log(board);
    let boardObject = new Board(ctx, c, snake, c.width / snake.size, c.height / snake.size) //createBoard(c, ctx, snake);
    //console.log(board);
    boardObject.create();
    //fillBoard(c, ctx, snake, board);
    //console.table(board);
    //drawBoard(ctx, snake, boardObject);
    moveSnake(ctx, snake, boardObject);
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

function moveSnake(ctx, snake, boardObject) {
    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case 'ArrowLeft':
                if (findAt(1).x === 0) {
                    addElement(snake.canvas.width - snake.size, findAt(1).y);
                    //console.log(snake.canvas.width - snake.size)
                } else {
                    addElement(findAt(1).x - snake.size, findAt(1).y);
                }
                break;
            case 'ArrowUp':
                if (findAt(1).y === 0) {
                    addElement(findAt(1).x, snake.canvas.height - snake.size);
                } else {
                    addElement(findAt(1).x, findAt(1).y - snake.size);
                }
                break;
            case 'ArrowRight':
                if (findAt(1).x === snake.canvas.width - snake.size) {
                    addElement(0, findAt(1).y);
                } else {
                    addElement(findAt(1).x + snake.size, findAt(1).y);
                }
                break;
            case 'ArrowDown':
                if (findAt(1).y === snake.canvas.height - snake.size) {
                    addElement(findAt(1).x, 0);
                }
                addElement(findAt(1).x, findAt(1).y + snake.size);
                break;
            default:
                console.log(event);
        }
        snake.update();
        boardObject.draw()//drawBoard(ctx, snake, board);
    })
}

class Board {
    constructor(ctx, canvas, snake, rowNbr, colNbr) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.snake = snake;
        this.rowNbr = rowNbr;
        this.colNbr = colNbr
    }

    draw() {
        this.ctx.strokeStyle = "black";
        for (let i = 0; i < board.length; i++) {
            switch (board[i].bonus) {
                case "":
                    this.ctx.strokeRect(board[i].x, board[i].y, this.snake.size, this.snake.size);
                    break;
                case "apple":
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(board[i].x, board[i].y, this.snake.size, this.snake.size);
                    this.ctx.strokeRect(board[i].x, board[i].y, this.snake.size, this.snake.size);
                    break;
                case "bomb":
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(board[i].x, board[i].y, this.snake.size, this.snake.size);
                    this.ctx.strokeRect(board[i].x, board[i].y, this.snake.size, this.snake.size);
                default:
                    break;
            }
        }
    }
    fillBoard() {
        console.log(board)
        let random;
        for (let i = 0; i < board.length; i++) {
            random = Math.floor(Math.random() * 11);
            switch (random) {
                case (0):
                    board[i].bonus = "apple";
                    break;
                case (1):
                    board[i].bonus = "bomb";
                    break;
                default:
                    board[i].bonus = "";
                    break;
            }
        }
    }
    create() {
        for (let i = 0; i < this.colNbr; i++) {
            for (let j = 0; j < this.rowNbr; j++) {
                board.push({
                    x: j * this.snake.size,
                    y: i * this.snake.size,
                    bonus: "",
                });
            }
        }
        this.fillBoard();
        this.draw();

    }
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
        snakeBody.forEach(element => {
            this.ctx.fillRect(element.x, element.y, this.size, this.size);
            this.ctx.strokeRect(element.x, element.y, this.size, this.size)
        });
    }
    createSnakeBody() {
        for (let i = 0; i < this.length; i++) {
            snakeBody.push({
                x: this.size * i,
                y: 0,
                place: i + 1
            })
        }
        this.draw();
    }
    update() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
    }
}