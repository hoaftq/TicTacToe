const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        clean: true,
        filename: '[name].js'
        // libraryTarget: 'module'
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
        ],
    },
    optimization: {
        minimize: false
    },
    experiments: {
        outputModule: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['main'],
            scriptLoading: 'module',
            minify: true,
        }),
        new ModuleFederationPlugin({
            name: 'tic-tac-toe-game',
            filename: 'remoteEntry.js',
            library: {
                type: "module"
            },
            exposes: {
                './tictactoe': './src/mfe/tictactoe.js',
            },
        }),
    ],
    devServer: {
        static: './dist',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
}