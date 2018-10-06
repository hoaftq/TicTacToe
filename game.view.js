"use strict";
function TTTGameView(container, userPlayHandler) {

    var displayState = {};
    displayState[X_STATE] = 'X';
    displayState[O_STATE] = 'O';
    displayState[EMPTY_STATE] = '';

    var board;

    this.create = function () {
        board = document.createElement('div');
        board.classList.add('ttt-board');
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let cell = document.createElement('div');
                cell.setAttribute('data-x', i);
                cell.setAttribute('data-y', j);
                cell.addEventListener('click', (e) => {
                    userPlayHandler(i, j);
                });
                board.appendChild(cell);
            }
        }

        container.appendChild(board);
    }

    this.clear = function () {
        var cells = board.childNodes;
        for (let i = 0; i < cells.length; i++) {
            cells.item(i).innerHTML = displayState[EMPTY_STATE];
        }
    }

    this.putAt = function (x, y, state) {
        var cell = board.querySelectorAll(`div[data-x='${x}'][data-y='${y}']`)[0];
        cell.innerHTML = displayState[state];
    }

    function showEndingEffect() {

    }
}