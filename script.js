// Show current grid state, draw it into DOM, accept
// player inputs in cells 
(function GameBoard(){
    const grid = [];
    resetBoard = () => {
        grid.length = 0;
        for(i=0;i<9;i++){
            grid.push(Cell())
        }
    }
    updateBoard = (index,player) => grid[index].setValue(player);
    getBoard = () => grid;
    return {resetBoard, updateBoard, getBoard}
})();

// Populate the game grid, set and get cell's value
function Cell(){
    let value = 0;
    getValue = () => value; 
    setValue = (player) => value = player;
    return {getValue, setValue};
}

// Run the game, switch turns, accept player inputs, determine
//  win-condition
// function GameController(){

// }

// Controls the UI representation of the game. Board, turns,
// player inputs, win screen etc.
// function ScreenController(){
    
// }1

(function WinCondition(){
    const winners = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    getWinners = () => winners;
    checkWin = () => {
        let filtered = [];
        getBoard().forEach((cell, index) => cell.getValue() == 1 ? filtered.push(index));
        return filtered;
    }
    checkDraw = () => {

    }
    return {getWinners, checkWin, checkDraw};
})();