const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/game.options.js',
        './src/game.results.js',
        './src/game.view.js',
        './src/game.logic.js',
        './src/game.js',
        './src/index.js'
    ],
    output: {
        clean: true,
        filename: '[name].js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    devServer: {
        static: './dist'
    }
}