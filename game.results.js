"use strict";
function TTTGameResults(container) {
    var wonElement,
        drawElement,
        lostElement;
    var won = 0,
        draw = 0,
        lost = 0;

    this.create = function () {
        var resultTitle = document.createElement('div');
        resultTitle.classList.add('ttt-result-title');
        resultTitle.appendChild(document.createTextNode('Results:'));
        container.appendChild(resultTitle);

        container.appendChild(wonElement = createResult('Won', won));
        container.appendChild(drawElement = createResult('Draw', draw));
        container.appendChild(lostElement = createResult('Lost', lost));
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

    function createResult(label, value) {
        var resultElem = document.createElement('div');
        resultElem.classList.add('ttt-result');

        var resultLabel = document.createElement('div');
        resultLabel.classList.add('ttt-result-label');
        resultLabel.appendChild(document.createTextNode(label));
        resultElem.appendChild(resultLabel);

        var resultValue = document.createElement('div');
        resultValue.classList.add('ttt-result-value');
        resultElem.appendChild(document.createTextNode(value));
        resultElem.appendChild(resultValue);

        return resultElem;
    }
}