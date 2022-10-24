const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'game.options': './game.options.js',
        'game.results': './game.results.js',
        'game.view': './game.view.js',
        'game.logic': './game.logic.js',
        'game': './game.js',
        'index': './index.js'
    },
    output: {
        clean: true,
        filename: '[name].js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    devServer: {
        static: './dist'
    }
}