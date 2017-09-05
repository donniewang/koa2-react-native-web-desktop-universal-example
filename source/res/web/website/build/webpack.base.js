const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const theme = require('../../../../src/client/web/pc/website/theme.config');

module.exports = {
    output: {
        filename: 'scripts/website/[name].js',
        path: path.join(__dirname, '../../../../../dist/server/public'),
        publicPath: '/'
    },
    resolve: {
        mainFiles: ["index.website", "index"],
        modules: [path.resolve(__dirname, '../../../../../node_modules'), path.join(__dirname, '../../../../src')],
        extensions: ['.website.js', '.web.js', '.jsx', '.js', '.css', '.less', '.json']
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
                        ["import", [{ "libraryName": "antd", "style": "css" }]]
                    ],
                    presets: ['es2015', 'stage-0', 'react'],
                    compact: true,
                }
            },
            {
                test: /\.less$/i,
                use: [
                    { loader: 'style-loader', options: {  } },
                    { loader: 'css-loader', options: { minimize: true, sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                                pxtorem({ rootValue: 100, propWhiteList: [] })
                            ],
                        },
                    },
                    { loader: 'less-loader', options: { "modifyVars":theme } }
                ],
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1, minimize: true, sourceMap: true, } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9',
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                    pxtorem({ rootValue: 100, propWhiteList: [] })
                                ],
                            },
                        },
                    ],
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
                    /antd/,
                    path.resolve(__dirname, '../svg/'),
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
                    require.resolve('antd').replace(/index\.js$/, ''),
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
            filename: 'website.html',
            template: './source/res/web/website/templates/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles/website/[name].css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: './source/res/web/website/assets/', to: './dist/server/public/images/website' }
        ])
    ]
};