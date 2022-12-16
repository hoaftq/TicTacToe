// TicTacToe - Vanilla JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';

import TTTGameLogic, { X_STATE, O_STATE, EMPTY_STATE, NORMAL_DEEP, HARD_DEEP } from './game.logic';
import TTTGameOptions, { X_SYMBOL, COMPUTER_FIRST, NORMAL_LEVEL } from './game.options';
import TTTGameResults from './game.results';
import TTTGameView from './game.view';

export default function TTTGame(boardContainer, optionsContainer, resultsContainer) {

    let isComputerFirst;
    let computerState;
    let userState;
    let deep;

    let isComputerTurn;
    let isPlaying;

    let gameLogic = new TTTGameLogic();

    const gameOptions = new TTTGameOptions(optionsContainer, (stater, userSymbol, level) => {
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

        gameLogic = new TTTGameLogic(deep);
        this.newGame();
    });

    const gameResults = new TTTGameResults(resultsContainer);

    const gameView = new TTTGameView(boardContainer,
        (e, x, y) => {
            if (!isPlaying || isComputerTurn) {
                return;
            }

            if (gameLogic.getAt(x, y) !== EMPTY_STATE) {
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
        const cell = gameLogic.getBestCellFor(computerState);
        if (cell) {
            playAt(cell.x, cell.y, computerState);
        }

        isComputerTurn = false;
    }

    function playAt(x, y, state) {
        gameView.putAt(x, y, state);
        gameLogic.putAt(x, y, state);
        const gameState = gameLogic.hasWon(x, y, state);

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
