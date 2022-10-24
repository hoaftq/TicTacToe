// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';
const SIZE = 3;

const EMPTY_STATE = '';
const X_STATE = 'x';
const O_STATE = 'O';

const NORMAL_DEEP = 3;
const HARD_DEEP = 5;

const ROW_FULL = '-';
const COLUMN_FULL = '|';
const TOPLEFT_FULL = '\\';
const BOTTOMLEFT_FULL = '/';

function TttGameLogic(deep) {
    this.deep = deep ? deep : NORMAL_DEEP;
    this.createBoard();
}

TttGameLogic.prototype = {

    createBoard: function () {
        this.cells = [
            [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
            [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
            [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE]
        ];
    },

    getBestCellFor: function (state) {
        let candidateCells = [];
        if (state === X_STATE) {
            let max = -Infinity;
            this.loopEmptyCells((x, y) => {
                let val = this.evalX(x, y, 0);
                if (val === max) {
                    candidateCells.push({ x, y });
                } else if (val > max) {
                    max = val;
                    candidateCells = [{ x, y }];
                }
            });
        } else {
            let min = Infinity;
            this.loopEmptyCells((x, y) => {
                let val = this.evalO(x, y, 0);
                if (val === min) {
                    candidateCells.push({ x, y });
                } else if (val < min) {
                    min = val;
                    candidateCells = [{ x, y }];
                }
            });
        }

        // Choose a random cell in all candidate cells
        let r = Math.floor(Math.random() * candidateCells.length);
        return candidateCells[r];
    },

    evalX: function (x, y, level) {
        if (level > this.deep) {
            return 0;
        }

        let ret;
        this.cells[x][y] = X_STATE;

        if (this.hasWon(x, y, X_STATE)) {
            ret = Infinity;
        } else {
            let val = Infinity;
            let countEmptyCell = this.loopEmptyCells((i, j) => {
                val = Math.min(val, this.evalO(i, j, level + 1));

                // Finish the loop by returning true
                if (val === -Infinity) {
                    return true;
                }
            });

            ret = countEmptyCell > 0 ? val : 0;
        }

        // Restore to the original state
        this.cells[x][y] = EMPTY_STATE;
        return ret;
    },

    evalO: function (x, y, level) {
        if (level > this.deep) {
            return 0;
        }

        let ret;
        this.cells[x][y] = O_STATE;

        if (this.hasWon(x, y, O_STATE)) {
            ret = -Infinity;
        } else {
            let val = -Infinity;
            let countEmptyCell = this.loopEmptyCells((i, j) => {
                val = Math.max(val, this.evalX(i, j, level + 1));

                // Finish the loop by returning true
                if (val === Infinity) {
                    return true;
                }
            });

            ret = countEmptyCell > 0 ? val : 0;
        }

        // Restore to the original state
        this.cells[x][y] = EMPTY_STATE;
        return ret;
    },


    hasWon: function (x, y, checkingState) {

        // Check if every cell in row x has the value of checkingState
        if (this.cells[x].every((value, index, array) => value === checkingState)) {
            return { type: ROW_FULL, value: x };
        }

        // Check if every cell in column y has the value of checking checkingState
        if (this.cells.every((value, index, array) => value[y] === checkingState)) {
            return { type: COLUMN_FULL, value: y };
        }


        // Check for diagonal from left top to right bottom
        if (x === y) {
            if (this.cells.every((value, index, array) => this.cells[index][index] === checkingState)) {
                return { type: TOPLEFT_FULL };
            }
        }

        // Check for diagonal from left bottom to right top
        if (x + y === SIZE - 1) {
            if (this.cells.every((value, index, array) => this.cells[index][SIZE - 1 - index] === checkingState)) {
                return { type: BOTTOMLEFT_FULL };
            }
        }

        return false;
    },

    putAt: function (x, y, state) {
        this.cells[x][y] = state;
    },

    getAt: function (x, y) {
        return this.cells[x][y];
    },

    hasEmptyCell: function () {
        return this.loopEmptyCells((x, y) => { return true; }) > 0;
    },

    loopEmptyCells: function (callback) {
        var count = 0;
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.cells[i][j] === EMPTY_STATE) {
                    count++;
                    if (callback && callback(i, j)) {
                        return count;
                    }
                }
            }
        }

        return count;
    },

    log: function () {
        for (let i = 0; i < SIZE; i++) {
            var str = "";
            for (let j = 0; j < SIZE; j++) {
                var temp = this.cells[i][j];
                if (!temp) {
                    temp = '@';
                }
                str += temp + ' ';
            }
            console.log(str);
        }
        console.log('-------');
    }
}

window.TttGameLogic = TttGameLogic;

window.SIZE = SIZE;

window.X_STATE = X_STATE;
window.O_STATE = O_STATE;
window.EMPTY_STATE = EMPTY_STATE;

window.NORMAL_DEEP = NORMAL_DEEP;
window.HARD_DEEP = HARD_DEEP;

window.ROW_FULL = ROW_FULL;
window.COLUMN_FULL = COLUMN_FULL;
window.TOPLEFT_FULL = TOPLEFT_FULL;
window.BOTTOMLEFT_FULL = BOTTOMLEFT_FULL;