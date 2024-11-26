import './index.css';
import './game.options.css'
import './game.results.css';
import './game.view.css';

import TTTGame from './game';

const board = document.getElementById('board');
const settings = document.getElementById('settings');
const results = document.getElementById('results');
const game = new TTTGame(board, settings, results);
game.initGame();