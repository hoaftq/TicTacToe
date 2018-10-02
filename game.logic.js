"use strict";

const EMPTY_STATE = '';
const X_STATE = 'x';
const O_STATE = 'O';

const HORIZONTAL = 1;
const VERTICAL = 2;
const TOPLEFT_BOTTOMRIGHT = 3;
const BOTTOMLEFT_TOPRIGHT = 4;

const SIZE = 3;

function TTTGameLogic() {
    // this.cells = Array(SIZE).fill(Array(SIZE).fill(EMPTY_STATE));
    this.cells = [
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
        [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE]
    ];
}

TTTGameLogic.prototype = {

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

                    // // Finish the loop
                    // if(max === Infinity){
                    //     return true;
                    // }
                }
            });
        } else {
            alert('x');
            this.loopEmptyCells((x, y) => {
                let val = this.evalO(x, y, 0);
                if (min >= val) {
                    min = val;
                    cell = { x, y };

                    // // Finish the loop
                    // if(min === -Infinity){
                    //     return true;
                    // }
                }
            });
        }

        return cell;
    },

    evalX: function (x, y, level) {
        if (level > 2) {
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
                // if(val == -Infinity){
                //     return true;
                // }
            });

            ret = countEmptyCell > 0 ? val : 0;
        }

        // Restore the original state
        this.cells[x][y] = EMPTY_STATE;
        console.log('ret x =' + ret);
        return ret;
    },

    evalO: function (x, y, level) {
        if (level > 2) {
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
                // if(val == Infinity){
                //     return true;
                // }
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
            return true;
        }

        // Check if every cell in column y has the value of checking checkingState
        if (this.cells.every((value, index, array) => value[y] === checkingState)) {
            return true;
        }

        if (x + y == SIZE - 1) {

            // Check for diagonal from left top to right bottom
            if (this.cells.every((value, index, array) => this.cells[index][index] === checkingState)) {
                return true;
            }

            // Check for diagonal from left bottom to right top
            if (this.cells.every((value, index, array) => this.cells[index][SIZE - 1 - index] === checkingState)) {
                return true;
            }
        }

        return false;
    },

    putAt: function (x, y, state) {
        this.cells[x][y] = state;
    },

    loopEmptyCells: function (callback) {
        var count = 0;
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.cells[i][j] === EMPTY_STATE) {
                    count++;
                    if(callback(i, j)){
                        return;
                    }
                }
            }
        }

        return count;
    },

    log: function(){
        for(let i = 0; i< SIZE; i++){
            var str = "";
            for(let j =0; j< SIZE; j++){
                var temp = this.cells[i][j];
                if(!temp){
                    temp = '@';
                }
                str +=  temp + ' ';
            }
            console.log(str);
        }
        console.log('-------');
    }
}