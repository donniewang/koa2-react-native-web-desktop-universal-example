const base = require('./webpack.base');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

base.devtool = 'cheap-source-map';

base.entry = {
    manage : './source/src/client/web/pc/manage/app.js'
};

base.plugins.push(
    new CleanWebpackPlugin(['dist/server/static/manage'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/scripts/manage'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/styles/manage'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/images/manage'],{ root: process.cwd() }),
    new CleanWebpackPlugin(['dist/server/public/manage.html'],{ root: process.cwd() }),
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