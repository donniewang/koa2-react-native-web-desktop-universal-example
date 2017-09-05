const base = require('./webpack.base');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

base.devtool = 'cheap-source-map';

base.entry = {
    mobile : './source/src/client/web/mobile/app.js'
};

base.plugins.push(
    new CleanWebpackPlugin(['dist/server/static/mobile'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/scripts/mobile'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/styles/mobile'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/images/mobile'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/mobile.html'],{ root: process.cwd() }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true, keep_fnames: true },
        compress: { screw_ie8: true, warnings: false },
        comments: false,
        output: { comments: false, },
    })
);

module.exports = base;