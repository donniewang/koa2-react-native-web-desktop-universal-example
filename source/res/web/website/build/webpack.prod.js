const base = require('./webpack.base');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

base.devtool = 'cheap-source-map';

base.entry = {
    website : './source/src/client/web/pc/website/app.js'
};

base.plugins.push(
    new CleanWebpackPlugin(['dist/server/static/website'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/scripts/website'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/styles/website'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/images/website'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/website.html'],{ root: process.cwd() }),
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