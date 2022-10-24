import './game.css';

var board = document.getElementById('board');
var settings = document.getElementById('settings');
var results = document.getElementById('results');
var game = new TttGame(board, settings, results);
game.initGame();