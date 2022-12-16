const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './game.options.js',
        './game.results.js',
        './game.view.js',
        './game.logic.js',
        './game.js',
        './index.js'
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
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    devServer: {
        static: './dist'
    }
}