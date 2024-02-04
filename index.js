const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;
const winningPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create function that will initialise the game
function initGame(){
    currPlayer ="X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty karna padega beta
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        //ek kam pending thi green color hatao bhai-> initialise css property with default value
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currPlayer}`;
}
initGame();


 function swapTurn(){
    if(currPlayer==="X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X"
    }
    //UI update
    gameInfo.innerHTML = `Current Player - ${currPlayer}`;
 }



 function checkGameOver(){
   let answer="";
   winningPos.forEach((position)=>{
    //all 3 boxes non empty and ans fill with exactly same value->>>
    if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

     
        if(gameGrid[position[0]] ==="X") answer = "X";
        else answer = "O";

       // disable pointer event when one winner got....
       
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
       })
        //now we know winner X or O
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
}

   });
     // agar answer no

     if(answer != ""){
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }
     //when there is no winner Game Tied
     let fillCnt = 0;
     gameGrid.forEach((box) => {
        if(box != "") fillCnt++;
     });

     if(fillCnt === 9){
        gameInfo.innerHTML = `Game Tied!`;
        newGameBtn.classList.add("active");
     }

}

function handelClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currPlayer;
        gameGrid[index] = currPlayer;
        //swap karo turn ka
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handelClick(index);
    })
})
 newGameBtn.addEventListener("click",initGame);

