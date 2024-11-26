import TTTGame from '../game';

import indexCss from 'raw-loader!./../index.css';
import optionsCss from 'raw-loader!./../game.options.css';
import resultsCss from 'raw-loader!./../game.results.css';
import viewCss from 'raw-loader!./../game.view.css';

class TicTacToe extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        [indexCss, optionsCss, resultsCss, viewCss].forEach(css => {
            const style = document.createElement('style');
            style.textContent = css;
            shadowRoot.appendChild(style);
        });

        const results = document.createElement("div");
        results.id = "results";
        shadowRoot.appendChild(results);

        const board = document.createElement("div");
        board.id = "board";
        shadowRoot.appendChild(board);

        const settings = document.createElement("div");
        settings.id = "settings";
        shadowRoot.appendChild(settings);

        const game = new TTTGame(board, settings, results);
        game.initGame();
    }
}

const elementName = 'tic-tac-toe';
customElements.define(elementName, TicTacToe);

export { elementName };