var base = require('./webpack.base');
var webpack = require('webpack');

base.devtool = 'source';

base.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = base;