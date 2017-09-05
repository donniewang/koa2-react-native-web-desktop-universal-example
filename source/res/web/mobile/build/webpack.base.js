const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    output: {
        filename: 'scripts/mobile/[name].js',
        path: path.join(__dirname, '../../../../../dist/server/public'),
        publicPath: '/'
    },
    resolve: {
        mainFiles: ["index.mobile", "index"],
        modules: [path.resolve(__dirname, '../../../../../node_modules'), path.join(__dirname, '../../../../src')],
        extensions: ['.mobile.js', '.web.js', '.jsx', '.js', '.css', '.less', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'external-helpers',
                        'add-module-exports',
                        ["transform-runtime", { polyfill: false }],
                        ["import", [{ "style": "css", "libraryName": "antd-mobile" }]]
                    ],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', {
                            loader: 'postcss-loader', options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                    }),
                                    pxtorem({ rootValue: 100, propWhiteList: [] })
                                ]
                            }
                        }, 'less-loader'
                    ]
                })
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', {
                            loader: 'postcss-loader', options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                    }),
                                    pxtorem({ rootValue: 100, propWhiteList: [] })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                exclude: /node_modules/,
                loader: 'url-loader?name=[name].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'application/octet-stream',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                exclude: [
                    /antd-mobile/,
                    path.resolve(__dirname, '../svg/')
                ],
                query: {
                    mimetype: 'image/svg+xml',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
                    path.resolve(__dirname, '../svg/')
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'mobile.html',
            template: './source/res/web/mobile/templates/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles/mobile/[name].css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: './source/res/web/mobile/assets/', to: './dist/server/public/images/mobile' }
        ])
    ],
};