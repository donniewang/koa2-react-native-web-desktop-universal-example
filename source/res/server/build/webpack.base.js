var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    devtool: false,
    entry: [
        './source/src/server/app.js'
    ],
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, '../../../../dist/server'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}