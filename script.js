(function GameBoard(){
    const grid = [];
    const Cell = function (){
        let value = 0;
        getValue = () => value; 
        setValue = (player) => value = player;
        return {getValue, setValue};
    }
    resetBoard = () => {
        grid.length = 0;
        for(i=0;i<9;i++){
            grid.push(Cell())
        }
    }
    updateBoard = (index,player) => grid[index].setValue(player);
    getBoard = () => grid.map( each => each.getValue());
})();

(function PlayerState(){
    let player = 0;
    switchPlayer = () => 
        player == 1 ? player = 2 : player = 1;
    resetPlayer = () => player = 0;
    getPlayer = () => player ; 
})();

(function AiLogic(){
    let winningMove;
    let findWinPattern = function(i1,i2,i3){
        getWinMoves().forEach(element => {
            if(
                findMatch(getPlayerMoves(getPlayer()),element,i1)
                && findMatch(getPlayerMoves(getPlayer()),element,i2)
                && !findMatch(getPlayerMoves(getPlayer()),element,i3)
                && getBoard()[i3] == 0
            ){
                winningMove = element[i3];
            };
        });
        return winningMove;
    }
    moveAi = () => {
        winningMove = 0;
        findWinPattern(0,1,2);
        findWinPattern(1,2,0);
        findWinPattern(2,0,1);
        if (getBoard()[4] == 0){
            updateBoard(4,2)
        } else if(!getBoard().includes(0)) {
            console.log('RUN OUT OF FREE CELLS!');
        } else if(winningMove && getBoard()[winningMove] == 0) {
            updateBoard(winningMove,2);
        } else {
            let pickRandom = () => Math.trunc(Math.random()*getPlayerMoves(0).length);
            updateBoard(getPlayerMoves(0)[pickRandom()],2);
        }
    } 
})();

(function WinCondition(){
    const winMoves = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    getPlayerMoves = (player) => {
        let playerMoves = [];
        playerMoves.length = 0;
        getBoard().forEach((element, index) => 
            element == player ? playerMoves.push(index) : 0);
            return playerMoves;
    };
    getWinMoves = () => winMoves;
    findMatch = (toMatch,winArray,index) => {
            return toMatch.includes(winArray[index]);
        }
    getWinner = () => {
        let winner;
        getWinMoves().forEach(element => {
            if(
                getPlayer()
                && findMatch(getPlayerMoves(getPlayer()),element,0) 
                && findMatch(getPlayerMoves(getPlayer()),element,1) 
                && findMatch(getPlayerMoves(getPlayer()),element,2)
            ){
                winner = element;
            }
        });
        return winner;
    }
    getDraw = () => {
        let draw;
        let potentialMoves;
        potentialMoves = getPlayerMoves(getPlayer()).concat(getPlayerMoves(0))
        getWinMoves().forEach(element => {
            if(
                !findMatch(potentialMoves,element,0) 
                && !findMatch(potentialMoves,element,1) 
                && !findMatch(potentialMoves,element,2)
            ){
                draw = 1;
            }
        });
        return draw;
    }
})();

(function GameController(){
    const takeInput = function(){
        if(getPlayer() == 1){
            playerMove = () => +prompt(`Choose from ${getPlayerMoves(0).toString()}`);
            let input = playerMove();
            if (getPlayerMoves(0).includes(input)) {
                updateBoard(input,1);
            } else if (!getBoard().includes(0)){
                alert(`no more moves left!`)
            }
        } else if(getPlayer() == 2){
            moveAi();
            alert(`opponent has made a move`);
        }
    }
    const playTurn = function(){
        switchPlayer();
        drawBoard();
        takeInput();
        if(getWinner()){
            console.log(`Player ${getPlayer()} wins with a ${getWinner().toString()} move`)
        } else if(getDraw() || !getBoard().includes(0)){
            console.log(`It's a draw! Run a new game!`);
        } else {
            playTurn();
        };
    }
    runGame = () => {
        resetBoard();
        drawBoard();
        resetPlayer();
        playTurn();
    }
  
})();

(function uiController(){
    const cells = document.querySelectorAll('.cells');
    drawBoard = () => {
        getBoard().forEach((element,index) => {
            if(element == 1){
                cells[index].innerText = '😝';
            } else if (element == 2){
                cells[index].innerText = '🤡';
            } else {
                cells[index].innerText = '';
            }
            if(getWinner()){
                getWinner().forEach(element => {
                    cells[element].classList.toggle('winner');
                })
            }
        })
    }
})();