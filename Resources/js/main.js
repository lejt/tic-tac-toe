// 1) initialize game 
//     a) board cleared
//     b) points zero
// 2) determine who goes first, player or computer
//     a) coin toss/rng
// 3) place marker onclick, but can click again to unselect
//     a) check if marker can be placed (if empty) 
//     b) finalize to end turn 
//     c) check condition of game (winner or loser determination)
//          i) log points 
//          ii) reset game (init but don't clear score)

const game = {
    playerScore: 0,
    computerScore: 0,
    whoGoesFirst: 1,
    turnCounter: 0,
    clearBoard: true,                  //dont know what this does yet
    boardTracker: [0,0,0,0,0,0,0,0,0],
    play: () => {
        // Init gameplay check output



        
        // locks in click to switch turn or end game:
        //btn.addEventListener("click", this.computerTurn);

        game.turnChooser();
        //click start game
        game.startGame();

    },
    startGame () {
        //include start button and cells . check placement above
        const startBtn = document.querySelector("button");

        const startTurn = () => {
            (this.whoGoesFirst === 1) ? this.playerTurn() : this.computerTurn(); 
        }

        startBtn.addEventListener("click", startTurn);

        
    },
    turnChooser () {
        const toggleSwitch = document.querySelector("input");

        //switches between -1 and 1, 1 for player goes first, -1 for computer goes first
        const toggleTurn = (e) => {
            this.whoGoesFirst *= -1;
            //console.log(e.target);
            console.log(this.whoGoesFirst);
        }

        toggleSwitch.addEventListener("click", toggleTurn);
    },
    playerTurn () {
        this.turnCounter = 1;

        const cell = document.querySelector(".game");     //not sure between .game or .game-cell
        //const btn = document.querySelector(".end-turn-button");

        // allows the placement and removal of marker upon click:
        // because using method inside object, cant use this.? but have to use game.? 
        // FOR METHODS THAT USE E, HAVE TO USE GAME., OTHER METHODS CAN USE THIS.
        cell.addEventListener("click", game.checkPlacement);
    },
    computerTurn () {
        this.turnCounter = -1;

        //finds which cell is empty on board
        let computerChoices = [];
        let idx = 0;

        // for each element in boardTracker array, log the empty cells to computerChoices
        
        this.boardTracker.forEach((item)=> {
            if (item === 0) {
                computerChoices.push(idx);
            }
            idx += 1;
        });
        console.log("Current Board: "+this.boardTracker);
        console.log("Computer Available Choices: "+computerChoices);

        //randomly selects a board spot from available choices
        let randomIndex = Math.floor(Math.random()*computerChoices.length);
        console.log("COMPUTER random index: "+ randomIndex);
        console.log("COMP CHOICE: "+computerChoices[randomIndex]);
        this.boardTracker[computerChoices[randomIndex]] = 2;
        const computerChoice = document.getElementById(String(computerChoices[randomIndex]+1));
        computerChoice.classList.toggle(".visible");
        computerChoice.style.backgroundColor = "blue";


        console.log("COMPUTER TURN FINIHSED");
        console.log("Current Board After Computer Turn: "+this.boardTracker);

        this.checkWinCon(); 
    },
    
    checkPlacement (e) {
        e.target.style.backgroundColor = "red";
        //if placement acceptable, initiate placement
        //check if it can even be placed, if pass, run placement()
        let markerLocation = parseInt(e.target.id)-1;
        //console.log(markerLocation);
        //console.log(game.boardTracker[markerLocation]);
        (game.boardTracker[markerLocation] === 0) ? game.placement(e) : alert("You cannot select that cell.");
            
    },
    
    placement (e) {
        //toggle image as all cells have both markers hidden
        e.target.classList.toggle(".visible"); 
    
        let markerLocation = parseInt(e.target.id)-1;
    
        //toggle marker on board to record selection from player
        (game.boardTracker[markerLocation] === 0) ? 
        game.boardTracker[markerLocation] = 1 : game.boardTracker[markerLocation] = 0;

        console.log("PLAYER TURN FINISHED");


        // IS IT THIS. OR GAME. console.log(this.boardTracker);
        this.checkWinCon();
    },
    
    checkWinCon () {
        //horizontal check
        let firstColumn = [0, 3, 6];
        let secondColumn = [1, 4, 7];
        let thirdColumn = [2, 5, 8];
    
        for (let idx = 0; idx<3; idx++) {
            let i = firstColumn[idx];
            let j = secondColumn[idx];
            let k = thirdColumn[idx];
            
            if (this.boardTracker[i] === this.boardTracker[j] && this.boardTracker[k] === this.boardTracker[i] && this.boardTracker[i] !== 0) {
                return this.endGame(this.boardTracker[i]);  
            }
        }
        
        //vertical check
        let firstRow = [0, 1, 2];
        let secondRow = [3, 4, 5];
        let thirdRow = [6, 7, 8];
    
        for (let idx = 0; idx<3; idx++) {
            let i = firstRow[idx];
            let j = secondRow[idx];
            let k = thirdRow[idx];
            
            if (this.boardTracker[i] === this.boardTracker[j] && this.boardTracker[k] === this.boardTracker[i] && this.boardTracker[i] !== 0) {
                return this.endGame(this.boardTracker[i]);  
            }
        }
        //diagonal check
        let firstRow2 = [0, 2];
        let secondRow2 = [4, 4];
        let thirdRow2 = [8, 6];
    
        for (let idx = 0; idx<2; idx++) {
            let i = firstRow2[idx];
            let j = secondRow2[idx];
            let k = thirdRow2[idx];  
    
            if (this.boardTracker[i] === this.boardTracker[j] && this.boardTracker[k] === this.boardTracker[i] && this.boardTracker[i] !== 0) {
                return this.endGame(this.boardTracker[i]);  
            }
        }
        if (this.turnCounter === 1) {
            this.computerTurn();
        } else {
            this.playerTurn();
        }
    },
    endGame (whoWon) {
        if (whoWon === 1) {
            this.playerScore += 1;

            const pScore = document.querySelector("#pScore");
            pScore.innerText = this.playerScore;

            return alert("Congrats, You Won!")
        } else {
            this.computerScore += 1;

            const cScore = document.querySelector("#cScore");
            cScore.innerText = this.computerScore;

            return alert("Wow, You Really SUCK!");
        }
    }

}




game.play();

// const cell = document.querySelectorAll(".game-cell");
// const btn = document.querySelector(".end-turn-button");


// // allows the placement and removal of marker upon click:
// cell.addEventListener("click", checkPlacement(e));
// // locks in click to switch turn or end game:
// btn.addEventListener("click", computerTurn);


