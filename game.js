"use strict";
function TTTGame(boardContainer, optionsContainer, resultsContainer) {

    var isComputerFirst;
    var computerState;
    var userState;
    var deep;

    var isComputerTurn;

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
    });

    var gameResults = new TTTGameResults(resultsContainer);

    var gameView = new TTTGameView(boardContainer, (x, y) => {
        if (isComputerTurn) {
            return;
        }

        putAt(x, y, userState);
        isComputerTurn = true;

        computerPlay();
    });


    this.initGame = function () {
        gameOptions.create();
        gameResults.create();
        gameView.create();
        gameLogic = new TTTGameLogic(deep);
    }

    this.newGame = function () {
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
            putAt(cell.x, cell.y, computerState);
        }

        isComputerTurn = false;
    }

    function putAt(x, y, state) {
        gameView.putAt(x, y, state);
        gameLogic.putAt(x, y, state);
    }
}