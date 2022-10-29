import './index.css';
import TTTGame from './game.js';

var board = document.getElementById('board');
var settings = document.getElementById('settings');
var results = document.getElementById('results');
var game = new TTTGame(board, settings, results);
game.initGame();