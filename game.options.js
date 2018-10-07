// TicTacToe - Pure JavaScript 
// Write by Trac Quang Hoa, 2018

"use strict";
const USER_STATER = 0;
const COMPUTER_STATER = 1;

const X_SYMBOL = 0;
const O_SYMBOL = 1;

const NORMAL_LEVEL = 0;
const HARD_LEVEL = 1;

function TTTGameOptions(container, changeHandler) {
    var starter = COMPUTER_STATER,
        userSymbol = O_SYMBOL,
        level = NORMAL_LEVEL;

    this.create = function () {
        let starterOption = {};
        starterOption[USER_STATER] = 'You';
        starterOption[COMPUTER_STATER] = 'Computer';
        container.appendChild(
            createOption(
                'Play first:',
                'starter',
                starterOption,
                starter,
                (value) => { starter = value; }));

        let symbolOption = {};
        symbolOption[X_SYMBOL] = 'X';
        symbolOption[O_SYMBOL] = 'O';
        container.appendChild(createOption(
            'Your symbol:',
            'symbol',
            symbolOption,
            userSymbol,
            (value) => { userSymbol = value; }));

        let levelOption = {};
        levelOption[NORMAL_LEVEL] = 'Normal';
        levelOption[HARD_LEVEL] = 'Hard';
        container.appendChild(createOption(
            'Level:',
            'level',
            levelOption,
            level,
            (value) => { level = value; }));

        container.appendChild(createButton('Apply'));

        changeHandler(starter, userSymbol, level);
    }

    function createOption(label, name, options, selectedValue, optionChangedHandler) {
        var option = document.createElement('div');
        option.classList.add('ttt-settings-option');

        var optionLabel = document.createElement('div');
        optionLabel.classList.add('ttt-settings-label');
        optionLabel.appendChild(document.createTextNode(label));
        option.appendChild(optionLabel);

        for (let value in options) {
            let optionValue = document.createElement('div');
            optionValue.classList.add('ttt-settings-value');
            optionValue.setAttribute('name', name);
            optionValue.setAttribute('data-value', value);
            if (value == selectedValue) {
                optionValue.setAttribute('data-selected', true);
            }
            optionValue.appendChild(document.createTextNode(options[value]));
            optionValue.addEventListener('click', function (e) {
                var options = option.getElementsByClassName('ttt-settings-value');
                for (let i = 0; i < options.length; i++) {
                    options.item(i).removeAttribute('data-selected');
                }

                this.setAttribute('data-selected', true);
                optionChangedHandler(value);
            });

            option.appendChild(optionValue);
        }

        return option;
    }

    function createButton(text) {
        var button = document.createElement('div');
        button.classList.add('ttt-settings-apply');
        button.innerHTML = text;
        button.addEventListener('click', function (e) {
            changeHandler(starter, userSymbol, level);
        });
        return button;
    }
}