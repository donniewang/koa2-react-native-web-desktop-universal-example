const base = require('./webpack.base');
const webpack = require('webpack');
const path = require('path');

base.devtool = 'source';

base.entry = {
    website: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8002',
        'webpack/hot/only-dev-server',
        './source/src/client/web/pc/website/app.js'
    ]
};

base.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
);

base.devServer = {
    historyApiFallback: true,
    noInfo: false,
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, '../../../../../dist/server/public'),
    port: 8002,
    host: '0.0.0.0',
    proxy: {
        "*": {
            target: 'http://127.0.0.1:8080',
            secure: false,
            changeOrigin: true
        }
    }
}

module.exports = base;