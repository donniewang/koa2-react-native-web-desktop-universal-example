var base = require('./webpack.base');
var webpack = require('webpack');

base.devtool = 'cheap-source-map';

base.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true, keep_fnames: true },
        compress: { screw_ie8: true, warnings: false },
        comments: false,
        output: { comments: false, },
    })
);

module.exports = base;