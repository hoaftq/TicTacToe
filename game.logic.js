// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

"use strict";
const EMPTY_STATE = '';
const X_STATE = 'x';
const O_STATE = 'O';

const NORMAL_DEEP = 2;
const HARD_DEEP = 3;

const ROW_FULL = '-';
const COLUMN_FULL = '|';
const TOPLEFT_FULL = '\\';
const BOTTOMLEFT_FULL = '/';

const SIZE = 3;

function TTTGameLogic(deep) {
    this.cells = [
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE]
    ];

    this.deep = deep ? deep : NORMAL_DEEP;
}

TTTGameLogic.prototype = {

    clear: function () {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                this.cells[i][j] = EMPTY_STATE;
            }
        }
    },

    getBestCellFor: function (state) {
        var cell;
        var max = -Infinity;
        var min = Infinity;

        if (state == X_STATE) {
            this.loopEmptyCells((x, y) => {
                console.log('evaluate ' + x + ',' + y);
                let val = this.evalX(x, y, 0);
                if (max <= val) {
                    max = val;
                    cell = { x, y };

                    // Finish the loop
                    if (max === Infinity) {
                        return true;
                    }
                }
            });
        } else {
            this.loopEmptyCells((x, y) => {
                let val = this.evalO(x, y, 0);
                if (min >= val) {
                    min = val;
                    cell = { x, y };

                    // Finish the loop
                    if (min === -Infinity) {
                        return true;
                    }
                }
            });
        }

        return cell;
    },

    evalX: function (x, y, level) {
        if (level > this.deep) {
            return 0;
        }

        var ret;
        this.cells[x][y] = X_STATE;
        console.log(x + ',' + y + ',' + X_STATE);
        this.log();

        if (this.hasWon(x, y, X_STATE)) {
            ret = Infinity;
        } else {
            let val = Infinity;
            let countEmptyCell = this.loopEmptyCells((i, j) => {
                val = Math.min(val, this.evalO(i, j, level + 1));
                if (val == -Infinity) {
                    return true;
                }
            });

            ret = countEmptyCell > 0 ? val : 0;
        }

        // Restore the original state
        this.cells[x][y] = EMPTY_STATE;
        console.log('ret x =' + ret);
        return ret;
    },

    evalO: function (x, y, level) {
        if (level > this.deep) {
            return 0;
        }

        var ret;
        this.cells[x][y] = O_STATE;
        console.log(x + ',' + y + ',' + O_STATE);
        this.log();

        if (this.hasWon(x, y, O_STATE)) {
            ret = -Infinity;
        } else {
            let val = -Infinity;
            var countEmptyCell = this.loopEmptyCells((i, j) => {
                val = Math.max(val, this.evalX(i, j, level + 1));
                if (val == Infinity) {
                    return true;
                }
            });

            ret = countEmptyCell > 0 ? val : 0;
        }

        // Restore the original state
        this.cells[x][y] = EMPTY_STATE;
        console.log('ret o =' + ret);
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

        if (x + y == SIZE - 1) {

            // Check for diagonal from left top to right bottom
            if (this.cells.every((value, index, array) => this.cells[index][index] === checkingState)) {
                return { type: TOPLEFT_FULL };
            }

            // Check for diagonal from left bottom to right top
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