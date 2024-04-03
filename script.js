function Cell(){
    let value = 0;
    getValue = () => value; 
    setValue = (player) => value = player;
    return {getValue, setValue};
}

function GameBoard(){
    const grid = [];
    resetBoard = () => {
        grid.length = 0;
        for(i=0;i<9;i++){
            grid.push(Cell())
        }
    }
    updateBoard = (index,player) => grid[index].setValue(player);
    getBoard = () => grid.map( each => each.getValue());
    return { resetBoard, updateBoard, getBoard}
};

function PlayerState(){
    let player = 0;
    switchPlayer = () => 
        player == 0 ? player = 1 : player == 1 ? player = 2 : player = 1;
    resetPlayer = () => player = 0;
    getPlayer = () => player ; 
    return {switchPlayer, resetPlayer, getPlayer};
};

function AiLogic(){
    moveAi = () => {
        if (getBoard()[4] == 0){
            updateBoard(4,2)
        } else if(getBoard().includes(0) == false) {
            console.log('RUN OUT OF FREE CELLS!');
        // } else if() {
        // if getPlayerMoves matches TWO elements in winMoves, make a winning move 
        } else {
            let random = () => Math.trunc(Math.random()*getPlayerMoves(0).length);
            updateBoard(getPlayerMoves(0)[random()],2);
        }
    }
    return {moveAi};
    
};

function WinCondition(){
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
    checkWin = () => {
        let moves = getPlayerMoves(getPlayer());
        getWinMoves().forEach(element => {
            moves.includes(element[0])&&
            moves.includes(element[1])&&
            moves.includes(element[2]) ?
            alert(`Player ${getPlayer()} wins at line ${element.toString()}`) :
            console.log(`miss`);
        });
        
    }
    return {getWinMoves};
};


