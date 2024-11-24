import TTTGame from '../game';

class TicTacToe extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

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