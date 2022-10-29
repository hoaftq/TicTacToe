Responsive Tic-Tac-Toe game implemented using Minimax algorithm.

The program is structed after MVC pattern
- **Controller**  
    *game.js* connect logic and view together
- **Model**  
    *game.logic.js* contain the main logic
- **View** is seperated into 3 files
    - *game.view.js* Display main game board in the center
    - *game.options.js* Display those options below the board
    - *game.results.js* Display game results on the top

It uses Webpack to bundle the source code and Eslint for static code analysis.  
There is also a pipeline with Jenkins to check the source code quality, bundle it and then deploy to a S3 bucket which you can refer to at [the link](http://simpletictactoe.s3-website-ap-southeast-1.amazonaws.com/)

### How to run
- `npm install` to install libraries
- Run locally with `npm start`
- Run eslint with `npm run eslint`
