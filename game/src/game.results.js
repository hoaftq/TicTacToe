// TicTacToe - Vanilla JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';

export default function TTTGameResults(container) {
    let wonElement,
        drawElement,
        lostElement;
    let won = 0,
        draw = 0,
        lost = 0;

    this.create = function () {
        // createResultTile('Results:');

        wonElement = createResult('Won', won);
        drawElement = createResult('Draw', draw);
        lostElement = createResult('Lost', lost);
    }

    this.incWon = function () {
        wonElement.innerHTML = ++won;
    }

    this.incDraw = function () {
        drawElement.innerHTML = ++draw;
    }

    this.incLost = function () {
        lostElement.innerHTML = ++lost;
    }

    // function createResultTile(title) {
    //     var resultTitle = document.createElement('div');
    //     resultTitle.classList.add('ttt-result-title');
    //     resultTitle.appendChild(document.createTextNode(title));
    //     container.appendChild(resultTitle);
    //     return resultTitle;
    // }

    function createResult(label, value) {
        const resultElem = document.createElement('div');
        resultElem.classList.add('ttt-result');

        const resultLabel = document.createElement('div');
        resultLabel.classList.add('ttt-result-label');
        resultLabel.appendChild(document.createTextNode(label));
        resultElem.appendChild(resultLabel);

        const resultValue = document.createElement('div');
        resultValue.classList.add('ttt-result-value');
        resultValue.appendChild(document.createTextNode(value));
        resultElem.appendChild(resultValue);

        container.appendChild(resultElem);
        return resultValue;
    }
}