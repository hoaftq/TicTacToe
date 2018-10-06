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
        container.appendChild(
            createOption(
                'Play first:',
                'starter',
                { USER_STATER: 'You', COMPUTER_STATER: 'Computer' },
                starter,
                (value) => { starter = value; }));

        container.appendChild(createOption(
            'Your symbol:',
            'symbol',
            { X_SYMBOL: 'X', O_SYMBOL: 'O' },
            userSymbol,
            (value) => { userSymbol = value; }));

        container.appendChild(createOption(
            'Level:',
            'level',
            { NORMAL_LEVEL: 'Normal', HARD_LEVEL: 'Hard' },
            level,
            (value) => { level = value; }));

        container.appendChild(createButton('Apply'));
    }

    function createOption(label, name, options, selectedValue, optionChangedHandler) {
        var wraper = document.createElement('div');

        var optionLabel = document.createElement('div');
        optionLabel.classList.add('ttt-settings-label');
        optionLabel.appendChild(document.createTextNode(label));
        wraper.appendChild(optionLabel);

        for (let value in options) {
            let option = document.createElement('div');
            option.classList.add('ttt-settings-option');
            option.setAttribute('name', name);
            option.setAttribute('data-value', value);
            if (value == selectedValue) {
                option.setAttribute('data-selected', true);
            }
            option.appendChild(document.createTextNode(options[value]));
            option.addEventListener('click', function (e) {
                var options = wraper.getElementsByClassName('ttt-settings-option');
                for (let i = 0; i < options.length; i++) {
                    options.item(i).removeAttribute('data-selected');
                }

                this.setAttribute('data-selected', true);
                optionChangedHandler(value);
            });

            wraper.appendChild(option);
        }

        return wraper;
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