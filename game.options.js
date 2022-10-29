// TicTacToe - Vanilla JavaScript 
// Write by Trac Quang Hoa, 2018

'use strict';

import './game.options.css'

export const USER_FIRST = 'UserFirst';
export const COMPUTER_FIRST = 'ComputerFirst';

export const X_SYMBOL = 'X';
export const O_SYMBOL = 'O';

export const NORMAL_LEVEL = 'Normal';
export const HARD_LEVEL = 'Hard';

export default function TTTGameOptions(container, changeHandler) {
    let starter = COMPUTER_FIRST,
        userSymbol = O_SYMBOL,
        level = NORMAL_LEVEL;

    this.create = function () {
        let firstPlayerOptions = {};
        firstPlayerOptions[USER_FIRST] = 'You';
        firstPlayerOptions[COMPUTER_FIRST] = 'Computer';
        container.appendChild(
            createOption(
                'Play first:',
                'starter',
                firstPlayerOptions,
                starter,
                (value) => { starter = value; }));

        let symbolOptions = {};
        symbolOptions[X_SYMBOL] = 'X';
        symbolOptions[O_SYMBOL] = 'O';
        container.appendChild(createOption(
            'Your symbol:',
            'symbol',
            symbolOptions,
            userSymbol,
            (value) => { userSymbol = value; }));

        let levelOptions = {};
        levelOptions[NORMAL_LEVEL] = 'Normal';
        levelOptions[HARD_LEVEL] = 'Hard';
        container.appendChild(createOption(
            'Level:',
            'level',
            levelOptions,
            level,
            (value) => { level = value; }));

        container.appendChild(createButton('Apply'));

        changeHandler(starter, userSymbol, level);
    }

    function createOption(label, name, options, selectedValue, optionChangedHandler) {
        let option = document.createElement('div');
        option.classList.add('ttt-settings-option');

        let optionLabel = document.createElement('div');
        optionLabel.classList.add('ttt-settings-label');
        optionLabel.appendChild(document.createTextNode(label));
        option.appendChild(optionLabel);

        for (let value in options) {
            let optionValue = document.createElement('div');
            optionValue.classList.add('ttt-settings-value');
            optionValue.setAttribute('name', name);
            optionValue.setAttribute('data-value', value);
            if (value === selectedValue) {
                optionValue.setAttribute('data-selected', true);
            }
            optionValue.appendChild(document.createTextNode(options[value]));
            optionValue.addEventListener('click', function () {
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
        button.addEventListener('click', function () {
            changeHandler(starter, userSymbol, level);
        });
        return button;
    }
}