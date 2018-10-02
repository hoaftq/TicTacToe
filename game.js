"use strict";

function TTTGame() {
    var board;

    var displayState = {};
    displayState[X_STATE] = 'X';
    displayState[O_STATE] = 'O';

    this.createView = function (container) {
        board = document.createElement('div');
        board.classList.add('ttt-board');
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let cell = document.createElement('div');
                cell.setAttribute('data-x', i);
                cell.setAttribute('data-y', j);
                cell.addEventListener('click', (e) => {
                    this.hitHandler(i, j);
                });
                board.appendChild(cell);
            }
        }

        container.appendChild(board);
    },

    this.putAt = function (x, y, state) {
        var cell = board.querySelectorAll(`div[data-x='${x}'][data-y='${y}']`)[0];
        cell.innerHTML = displayState[state];
        TTTGame.prototype.putAt.call(this, x, y, state);
    },

    this.showWinEffect = function() {
        
    }

    this.hitHandler = function(x, y) {
        this.putAt(x, y, O_STATE);

        var cell = this.getBestCellFor(X_STATE);
        if(cell){
            this.putAt(cell.x, cell.y, X_STATE);
        }
    }

    
}

TTTGame.prototype = new TTTGameLogic();
