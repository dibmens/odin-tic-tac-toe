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
        nextTurn();
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
    runGame = () => {
        resetBoard();
        resetPlayer();
        drawBoard();
        switchPlayer();
        movePlayer();
    }
    nextTurn = () => {
        getWinner();
        getDraw();
        drawBoard();
        switchPlayer();
        if(getPlayer()==1){
            movePlayer()
        } else {moveAi()}
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
                cells[index].classList.remove(`winner`);
            }
            if(getWinner()){
                getWinner().forEach(element => {
                    cells[element].classList.add('winner');})
            }
        })
    }
    movePlayer = () => {
        cells.forEach((element,index) => {
            element.addEventListener(`click`, () => {
                console.log(`testo`);
                if (getBoard()[index] == 0 && getPlayer() == 1){
                    updateBoard(index,1)
                    nextTurn();
                }
            })
        })
    }
    const randomize = (n) => Math.trunc(Math.random()*n);
    replyChat = () => {
        const replies = [
            `Alright! Let's dig you a tic tac tomb`,
            `Famous last words! You're on!`,
            `Let's see who's going to do the smashing around here!`,
            `That's the thing with you clowns- gluttons for humiliation!`,
            `A bet, huh? How are you going to repay me- in balloon animals?`,
            `You? Smash me? You really are a clown!`
        ];
        document.querySelector(`.reply`).addEventListener(`click`, () => {
            document.querySelector(`.reply`).classList.add(`hidden`);
            document.querySelector(`.reply-box`).innerText = 
                replies[randomize(replies.length)]+' 😝';
            setTimeout(() => {
                document.querySelector(`.start`).classList.remove(`hidden`);
                }, 2300
            );
            setTimeout(() => {
                document.querySelector(`.chat-bubble-game`).classList.remove(`hidden`)
                }, 3300
            );
            runGame();
        })
    }
    resetMessage = () => {
        const winReplies = [
            `Get clowned! I win!`,
            `Uh oh I win. Better luck next time`,
            `That's all you've got? Pathetic!`,
            `Surely you can do better than that!`,
            `I win! You lose. Universe is at peace!`,
            `Easy! Like taking candy-cotton from a clown`
        ]
        const lossReplies = [
            `Wait, you can actually win? Damn...`,
            `Ok, I didn't expect that...`,
            `One in a million, truly, congrats.`,
            `Alright. You smashed me. Happy?`,
            `I...lost? How?`,
            `My mad. Just warming up`
        ]
        const resultMessage = document.querySelector(`.result`)
        const resetBubble = document.querySelector(`.reset-box`);
        resultMessage.classList.remove(`hidden`);
        if(win){
            resultMessage.innerText = winReplies[randomize(winReplies.length)]
        } else if (loss){
            resultMessage.innerText = lossReplies[randomize(lossReplies.length)]
        }
        setTimeout(() => {
            resetBubble.classList.remove(`hidden`)
        }, 1500
        );
        document.querySelector(`.reset`).addEventListener(`click`, () => {
            resultMessage.classList.add(`hidden`);
            resetBubble.classList.add(`hidden`)
            runGame();
        })
    }
    return replyChat();
})();