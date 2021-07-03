document.addEventListener("DOMContentLoaded", function () {
    startGame();
})


let snakeBody = [
    {
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
    }
];

let apples= [
    {
        x: 100,
        y: 100,
        appleMangé:0
    },
    {
        x: 40,
        y: 0,
        appleMangé:0
    }

]

function startGame() {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const snake = new Snake(15, 10, c, ctx, "#0000FF");
    const apple = new Snake(5,5, c, ctx ,'red');
    apple.drawApple();
  //  snake.createSnakeBody();
     snake.draw();
    moveSnake(snake, apples);
   
}


// function appleMangé(snakeBody, apples){

//     let pos= {
//         posX:snakeBody[0].x,
//         posY:snakeBody[0].y
//     }
//       for( let i=0;i<apples.length;i++)
//       {
//           if(pos.posX===apples[i].x  && pos.posY === apples[i].y)
//           {
//               apples[i].appleMangé=1;
//           }
//           console.table(apples);
//       }  
// }


function findAt(position) {
    //debugger;
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

function moveSnake(snake,apples) {
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
      
        // appleMangé(snakeBody, apples);
        snake.update();
        // apple.drawApple();
        // //for (let i = 0 ; i <= apples.length ; i++) { console.log(apples[i].appleMangé);}
        // for (let i = 0 ; i < apples.length ; i++)
        // { if(apples[i].appleMangé === 1)
        //     {    console.log(apples[i.appleMangé]) //delete cette apple 
        //      }
        // }
        
       
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
    drawApple(){
         for (let i=0; i < apples.length; i++){
            this.ctx.beginPath(); 
            this.ctx.fillStyle = this.color; 
            this.ctx.fillRect(apples[i].x, apples[i].y, this.size, this.size);
            this.ctx.stroke(); 
            console.log(apples[i].x, apples[i].y, this.size, this.size);
            }
    }
    draw() {
      
        snakeBody.forEach(element => { this.ctx.beginPath(); 
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(element.x, element.y, this.size, this.size); 
            this.ctx.stroke(); });
    }
    // createApples() {
    //     for (let i = 0; i < this.length; i++) {
    //         snakeBody.push({
    //             x: this.size*i,
    //             y: 0,
    //             place: i+1
    //         })
    //     }
    //     this.draw();
    // }
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
        this.drawApple();
    }
}