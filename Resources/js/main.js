/* GAME LOGIC TREE */
// 1) Who goes first? if player, initiate player turn, if computer, initiate computer turn
// 2a) player turn, allows click, but checks if it can be placed first 
// 2b) computer turn, checks available spaces
// 3a i) if player can place, drop a marker on click space
// 3a ii) if player cannot place, wait for valid input
// 3b i) computer place marker in available space
// 4) After marker placement of either player or computer, check if win condition, if not, continue with opposing player turn (step 2)
// 5) If someone won, who won? add score to player or computer accordingly 


const game = {
    playerScore: 0,
    computerScore: 0,
    whoGoesFirst: 1,
    turnCounter: 0,
    boardTracker: [0,0,0,0,0,0,0,0,0],
    play: () => {

        //allows player to choose who goes first
        game.turnChooser();

        //click start game
        game.startGame();

        //allows player to restart game, clears board but not scores

    },
    startGame () {
        
        const startBtn = document.querySelector("button");

        const startTurn = () => {
            (this.whoGoesFirst === 1) ? this.playerTurn() : this.computerTurn(); 
        }

        //allows corresponding player or computer to start turn based on turnChooser
        startBtn.addEventListener("click", startTurn);
    },
    turnChooser () {
        const toggleSwitch = document.querySelector("input");

        const toggleTurn = (e) => {
            this.whoGoesFirst *= -1;
            //console.log(e.target);
            //console.log(this.whoGoesFirst);
            (this.whoGoesFirst === 1) ? console.log("Player goes first.") : console.log("Computer goes first.");
        }

        //switches between -1 and 1 when toggle clicked; 1 for player goes first, -1 for computer goes first
        toggleSwitch.addEventListener("click", toggleTurn);
    },
    playerTurn () {
        this.turnCounter = 1;

        const cell = document.querySelector(".game");   

        //allows the clicking of cell and checks if it can be placed
        cell.addEventListener("click", this.checkPlacement);
    },
    computerTurn () {
        this.turnCounter = -1;

        let computerChoices = [];
        let idx = 0;

        //finds which cell is empty on board
        //for each element in boardTracker array, log the empty cells to computerChoices
        this.boardTracker.forEach((item)=> {
            if (item === 0) {
                computerChoices.push(idx);
            }
            idx += 1;
        });
        // console.log("Current Board: "+this.boardTracker);
        // console.log("Computer Available Choices: "+computerChoices);

        //randomly selects a board spot from available choices
        let randomIndex = Math.floor(Math.random()*computerChoices.length);
        //console.log("COMPUTER random index: "+ randomIndex);
        //console.log("COMP CHOICE: "+computerChoices[randomIndex]);
        this.boardTracker[computerChoices[randomIndex]] = 2;
        const computerChoice = document.getElementById(String(computerChoices[randomIndex]+1));
        
        computerChoice.classList.toggle(".visible");                         // <----------------------------------
        computerChoice.style.backgroundColor = "blue";

        console.log("COMPUTER TURN FINISHED");
        //console.log("Current Board After Computer Turn: "+this.boardTracker);

        this.checkWinCon(); 
    },
    
    checkPlacement (e) {
        //checks if placement acceptable, if so, initiate placement
        let markerLocation = parseInt(e.target.id)-1;
        //console.log(markerLocation);
        //console.log(game.boardTracker[markerLocation]);
        (game.boardTracker[markerLocation] === 0) ? game.placement(e) : alert("You are clicking the wrong area.");
            
    },
    
    placement (e) {
        //toggle image as all cells have both markers hidden
        e.target.classList.toggle(".visible");                               // <----------------------------------
        e.target.style.backgroundColor = "red";

        let markerLocation = parseInt(e.target.id)-1;
    
        //toggle marker on board to record selection from player
        (game.boardTracker[markerLocation] === 0) ? 
        game.boardTracker[markerLocation] = 1 : game.boardTracker[markerLocation] = 0;

        console.log("PLAYER TURN FINISHED");

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

        // Checks if all space on board is occupied and with no winner in sight, proceed to tie game alert
        const isOccupied = (item) => item !== 0;

        if (this.boardTracker.every(isOccupied)) {
            return this.endGame(0);
        }

        // Alternates turns based on turn counter
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
        } else if (whoWon === 2) {
            this.computerScore += 1;

            const cScore = document.querySelector("#cScore");
            cScore.innerText = this.computerScore;

            return alert("Wow, You Really SUCK!");
        } else {
            return alert("Tie Game!");
        }
    }

}




game.play();
