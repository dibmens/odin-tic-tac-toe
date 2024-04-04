function Cell(){
    let value = 0;
    getValue = () => value; 
    setValue = (player) => value = player;
    return {getValue, setValue};
}

(function GameBoard(){
    const grid = [];
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
        player == 0 ? player = 1 : player == 1 ? player = 2 : player = 1;
    resetPlayer = () => player = 0;
    getPlayer = () => player ; 
})();

(function AiLogic(){
    let winningMove;
    let findWinPattern = function(i1,i2,i3){
        getWinMoves().forEach(element => {
            if(
                findMatch(element,i1)
                && findMatch(element,i2)
                && !findMatch(element,i3)
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
    let winner;
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
    const playerMoves = [];
    getPlayerMoves = (player) => {
        playerMoves.length = 0;
        getBoard().forEach((element, index) => 
            element == player ? playerMoves.push(index) : 0);
            return playerMoves;
    };
    getWinMoves = () => winMoves;
    findMatch = (winArray,index) => {
        return getPlayerMoves(getPlayer()).includes(winArray[index]);
    }
    getWinner = () => {
        getWinMoves().forEach(element => {
            if(findMatch(element,0) && findMatch(element,1) && findMatch(element,2)){
                // alert(`Player ${getPlayer()} wins at line ${element.toString()}`)
                winner = element;
            }
        });
        return winner;
    }

})();

(function GameController(){
    const takeInput = function(){
        if(getPlayer() == 1){
            playerMove = () => +prompt(`Choose from ${getPlayerMoves(0).toString()}`);
            let input = playerMove();
            if (getPlayerMoves(0).includes(input)) {
                updateBoard(input,1)
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
        takeInput()
        getWinner()
        ? console.log(`Player ${getPlayer()} wins with ${getWinner().toString()} move`)
        : playTurn();
    }

    runGame = () => {
        resetBoard();
        resetPlayer();
        playTurn();
    }
  
})();