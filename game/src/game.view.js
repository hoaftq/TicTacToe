// TicTacToe - Vanilla JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';

import { X_STATE, O_STATE, EMPTY_STATE, SIZE, ROW_FULL, COLUMN_FULL, TOPLEFT_FULL, BOTTOMLEFT_FULL } from "./game.logic";

export default function TTTGameView(container, userPlayHandler, newGameHandler) {

    const WinEffectClass = 'ttt-won-line';

    const displayStates = {};
    displayStates[X_STATE] = 'X';
    displayStates[O_STATE] = 'O';
    displayStates[EMPTY_STATE] = '';

    let board;
    let endingDlg;

    this.create = function () {
        board = document.createElement('div');
        board.classList.add('ttt-board');
        board.addEventListener('click', () => {
            newGameHandler();
        });

        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                const cell = document.createElement('div');
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
        endingDlg.addEventListener('click', () => {
            newGameHandler();
        });
        container.appendChild(endingDlg);
    }

    this.clear = function () {
        const cells = board.childNodes;
        for (let i = 0; i < cells.length; i++) {
            const item = cells.item(i);
            item.innerHTML = displayStates[EMPTY_STATE];
            item.classList.remove(WinEffectClass);
        }

        endingDlg.style.display = 'none';
    }

    this.putAt = function (x, y, state) {
        const cell = board.querySelector(`div[data-x='${x}'][data-y='${y}']`);
        cell.innerHTML = displayStates[state];
    }

    this.showWonEffect = function (line) {
        switch (line.type) {
            case ROW_FULL:
                {
                    const items = board.querySelectorAll(`div[data-x='${line.value}']`);
                    for (let i = 0; i < items.length; i++) {
                        items.item(i).classList.add(WinEffectClass);
                    }
                    break;
                }
            case COLUMN_FULL:
                {
                    const items = board.querySelectorAll(`div[data-y='${line.value}'`);
                    for (let i = 0; i < items.length; i++) {
                        items.item(i).classList.add(WinEffectClass);
                    }
                    break;
                }
            case TOPLEFT_FULL:
                for (let i = 0; i < SIZE; i++) {
                    const item = board.querySelector(`div[data-x='${i}'][data-y='${i}']`);
                    item.classList.add(WinEffectClass);
                }
                break;
            case BOTTOMLEFT_FULL:
                for (let i = 0; i < SIZE; i++) {
                    const item = board.querySelector(`div[data-x='${i}'][data-y='${SIZE - 1 - i}']`);
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
