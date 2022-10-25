// game constance & variables


let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOveSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 15;
let scrore = 0;
lastpaintTime = 0;
let snakearray = [
    {x: 13, y: 15}
]
food = {x: 6, y: 5};

// game function

function main(ctime) {
    window.requestAnimationFrame(main);
      console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();


}

function iscollide(snake){
    // if ou bum into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[1].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        // const element = array[i];
        
    }
    // if you bump into the the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0) {
        return true
    }
}


function gameEngine() {
    // part 1 = updating the snake array & food
    if (iscollide(snakearray)) {
     gameOveSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. press any key to play again")
        snakearray = [{x: 13, y: 15}];
        musicSound.play();
        scrore = 0;
        
    }

        // if you eaten the food , increment the score and regenerate the food

        if (snakearray[0].y === food.y && snakearray[0].x ===food.x){
            
            snakearray.unshift({x: snakearray[0].x + inputDir.x,y:snakearray[0].y + inputDir.y})
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
            foodSound.play();
            scrore += 1;
            scoreBox.innerHTML = "score: " + scrore;
            if (scrore>hiscoreval) {
                hiscoreval = scrore;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;
            }
            // scoreBox.innerHTML = "score: " + scrore;
            
        }



//  moving the snake

        for (let i = snakearray.length - 2; i>=0; i--) {
            snakearray[i+1] ={...snakearray[i]}
            
        }

        snakearray[0].x += inputDir.x;
        snakearray[0].y += inputDir.y;


    // part 2 = Display the snake and food

    // Display the snake
    board.innerHTML = "";
    snakearray.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake'); for further process
        if(index === 0){
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

     // Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}










// main logic start hera
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "hiscore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0,y: 1}  //strart the game 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
    
});