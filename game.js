// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

"use strict";
function TTTGame(boardContainer, optionsContainer, resultsContainer) {

    var isComputerFirst;
    var computerState;
    var userState;
    var deep;

    var isComputerTurn;
    var isPlaying;

    var gameOptions = new TTTGameOptions(optionsContainer, (stater, userSymbol, level) => {
        isComputerFirst = (stater == COMPUTER_STATER);

        if (userSymbol == X_SYMBOL) {
            userState = X_STATE;
            computerState = O_STATE;
        } else {
            userState = O_STATE;
            computerState = X_STATE;
        }

        if (level == NORMAL_LEVEL) {
            deep = NORMAL_DEEP;
        } else {
            deep = HARD_DEEP;
        }

        this.newGame();
    });

    var gameResults = new TTTGameResults(resultsContainer);

    var gameView = new TTTGameView(boardContainer,
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

    var gameLogic = new TTTGameLogic(deep);

    this.initGame = function () {
        gameResults.create();
        gameView.create();
        gameOptions.create();
    }

    this.newGame = function () {
        isPlaying = true;
        gameView.clear();
        gameLogic.clear();

        if (isComputerFirst) {
            computerPlay();
        } else {
            isComputerTurn = false;
        }
    }

    function computerPlay() {
        var cell = gameLogic.getBestCellFor(computerState);
        if (cell) {
            playAt(cell.x, cell.y, computerState);
        }

        isComputerTurn = false;
    }

    function playAt(x, y, state) {
        gameView.putAt(x, y, state);
        gameLogic.putAt(x, y, state);
        var gameState = gameLogic.hasWon(x, y, state);

        // User or computer has won
        if (gameState) {
            isPlaying = false;
            gameView.showWonEffect(gameState);
            if (state == userState) {
                gameResults.incWon();
                gameView.showEndingNotify('You won!');
            } else {
                gameResults.incLost();
                gameView.showEndingNotify('You lost!');
            }
        }
        // No one won and there is no empty cell left, the game is draw
        else if (!gameLogic.hasEmptyCell()) {
            isPlaying = false;
            gameResults.incDraw();
            gameView.showEndingNotify('Draw!');

        }
    }
}