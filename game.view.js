// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';
function TttGameView(container, userPlayHandler, newGameHandler) {

    const WinEffectClass = 'ttt-won-line';

    let displayStates = {};
    displayStates[X_STATE] = 'X';
    displayStates[O_STATE] = 'O';
    displayStates[EMPTY_STATE] = '';

    let board;
    let endingDlg;

    this.create = function () {
        board = document.createElement('div');
        board.classList.add('ttt-board');
        board.addEventListener('click', (e) => {
            newGameHandler();
        });

        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let cell = document.createElement('div');
                cell.setAttribute('data-x', i);
                cell.setAttribute('data-y', j);
                cell.addEventListener('click', (e) => {
                    userPlayHandler(e, i, j);
                });
                board.appendChild(cell);
            }
        }

        container.appendChild(board);

        endingDlg = document.createElement('div');
        endingDlg.classList.add('ttt-ending-nofify');
        endingDlg.addEventListener('click', (e) => {
            newGameHandler();
        });
        container.appendChild(endingDlg);
    }

    this.clear = function () {
        var cells = board.childNodes;
        for (let i = 0; i < cells.length; i++) {
            var item = cells.item(i);
            item.innerHTML = displayStates[EMPTY_STATE];
            item.classList.remove(WinEffectClass);
        }

        endingDlg.style.display = 'none';
    }

    this.putAt = function (x, y, state) {
        var cell = board.querySelector(`div[data-x='${x}'][data-y='${y}']`);
        cell.innerHTML = displayStates[state];
    }

    this.showWonEffect = function (line) {
        let items;
        switch (line.type) {
            case ROW_FULL:
                items = board.querySelectorAll(`div[data-x='${line.value}']`);
                for (let i = 0; i < items.length; i++) {
                    items.item(i).classList.add(WinEffectClass);
                }
                break;
            case COLUMN_FULL:
                items = board.querySelectorAll(`div[data-y='${line.value}'`);
                for (let i = 0; i < items.length; i++) {
                    items.item(i).classList.add(WinEffectClass);
                }
                break;
            case TOPLEFT_FULL:
                for (let i = 0; i < SIZE; i++) {
                    let item = board.querySelector(`div[data-x='${i}'][data-y='${i}']`);
                    item.classList.add(WinEffectClass);
                }
                break;
            case BOTTOMLEFT_FULL:
                for (let i = 0; i < SIZE; i++) {
                    let item = board.querySelector(`div[data-x='${i}'][data-y='${SIZE - 1 - i}']`);
                    item.classList.add(WinEffectClass);
                }
                break;
        }
    }

    this.showEndedNotify = function (message) {
        endingDlg.innerHTML = message;
        endingDlg.style.display = 'block';
    }
}

window.TttGameView = TttGameView;