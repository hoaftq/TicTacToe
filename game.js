// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';
function TttGame(boardContainer, optionsContainer, resultsContainer) {

    let isComputerFirst;
    let computerState;
    let userState;
    let deep;

    let isComputerTurn;
    let isPlaying;

    let gameLogic = new TttGameLogic(deep);

    let gameOptions = new TttGameOptions(optionsContainer, (stater, userSymbol, level) => {
        isComputerFirst = (stater === COMPUTER_FIRST);

        if (userSymbol === X_SYMBOL) {
            userState = X_STATE;
            computerState = O_STATE;
        } else {
            userState = O_STATE;
            computerState = X_STATE;
        }

        if (level === NORMAL_LEVEL) {
            deep = NORMAL_DEEP;
        } else {
            deep = HARD_DEEP;
        }

        gameLogic = new TttGameLogic(deep);
        this.newGame();
    });

    let gameResults = new TttGameResults(resultsContainer);

    let gameView = new TttGameView(boardContainer,
        (e, x, y) => {
            if (!isPlaying || isComputerTurn) {
                return;
            }

            if (gameLogic.getAt(x, y) != EMPTY_STATE) {
                return;
            }

            // User plays
            playAt(x, y, userState);
            isComputerTurn = true;

            // After that computer automatically plays
            if (isPlaying) {
                computerPlay();
            }

            // Clicking on a cell has been treated as a play step, so do not bubble it to new game event
            e.cancelBubble = true;
        },
        () => {
            if (!isPlaying) {
                this.newGame();
            }
        }
    );



    this.initGame = function () {
        gameResults.create();
        gameView.create();
        gameOptions.create();
    }

    this.newGame = function () {
        isPlaying = true;
        gameView.clear();
        gameLogic.createBoard();

        if (isComputerFirst) {
            computerPlay();
        } else {
            isComputerTurn = false;
        }
    }

    function computerPlay() {
        let cell = gameLogic.getBestCellFor(computerState);
        if (cell) {
            playAt(cell.x, cell.y, computerState);
        }

        isComputerTurn = false;
    }

    function playAt(x, y, state) {
        gameView.putAt(x, y, state);
        gameLogic.putAt(x, y, state);
        let gameState = gameLogic.hasWon(x, y, state);

        // User or computer has won
        if (gameState) {
            isPlaying = false;
            gameView.showWonEffect(gameState);
            if (state === userState) {
                gameResults.incWon();
                gameView.showEndedNotify('You won!');
            } else {
                gameResults.incLost();
                gameView.showEndedNotify('You lost!');
            }
        }
        // No one won and there is no empty cell left, the game is draw
        else if (!gameLogic.hasEmptyCell()) {
            isPlaying = false;
            gameResults.incDraw();
            gameView.showEndedNotify('Draw!');
        }
    }
}