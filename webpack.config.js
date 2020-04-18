const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const getLocalIdent = require('css-loader/dist/utils').getLocalIdent;

const config = ( webpackMode ) => {

    let builtConfig = {
        entry: {
            // gets filled depending on development or production
            // multiple entrypoints for REAL separated html pages
            app: [ /*"@babel/polyfill/noConflict",*/ './src/index.tsx' ]
            // boilerplateBlock: [ getIndexFile( 'boilerplateBlock' ) ],
            // frontend: [ "@babel/polyfill", getIndexFile( 'frontend' ) ],
            // backend: [ "@babel/polyfill", getIndexFile( 'backend' ) ],
            // someOtherChunk: path.join( __dirname, 'src/pages/someOtherChunkIndex.tsx' ),
        },

        output: {
            path: path.join( __dirname, '/dist' ),
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash].js',
            publicPath: '/'
        },

        node: {
            __dirname: true
        },

        module: {
            rules: [
                {
                    test: /\.tsx?/,
                    use: {
                        loader: 'ts-loader',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html/,
                    use: 'html-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                import: ( p, r ) => {
                                    // controls ignore external imports => return false <= ignores file
                                    // if (parsedImport.url.includes('style.css')) {
                                    //     return false;
                                    // }
                                    return true
                                },
                                // modules: {
                                // localIdentName for global file naming
                                //     // localIdentName: '[local]__holla',
                                // getLocalIdent for specific file naming
                                //     // getLocalIdent: (context, localIdentName, localName, options) => {
                                //     //     return 'ac_' + localName;
                                //     // },
                                // },
                            }
                        },
                        // 'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|otf|woff)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ico)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'favicons/'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [ '.js', '.jsx', '.css', '.scss', '.ts', '.tsx', '.json', '.html' ],
            alias: {
                '@components': path.resolve(__dirname, 'src', 'components'),
                '@helper': path.resolve(__dirname, 'src', 'helper'),
                '@root': path.resolve(__dirname, 'src'),
                // for IE Support of react-spring
                // 'react-spring$': 'react-spring/web.cjs',
                // 'react-spring/renderprops$': 'react-spring/renderprops.cjs'
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: './assets/favicon/ac.ico',
                filename: `index.html`,
                title: 'Jobs Dashboard',
                template: `./src/htmlTemplates/index.template.ejs`,
                chunks: [ 'app' ]
            }),
            // multiple entrypoints for REAL separated html pages
            // new HtmlWebpackPlugin({
            //     favicon: './src/assets/favicons/ac.ico',
            //     filename: 'index.html',
            //     title: 'AdmiralCloud Mediahub',
            //     template: './src/DEV/pages/basic.template.ejs',
            //     chunks: [ 'index' ] // key from entry
            // }),
            // new HtmlWebpackPlugin({
            //     favicon: './src/assets/favicons/ac.ico',
            //     filename: 'someFolder/someOtherPage.html',
            //     title: 'AdmiralCloud Some Other Page',
            //     template: './src/DEV/pages/basic.template.ejs',
            //     chunks: [ 'someOtherChunk' ] // key from entry
            // }),
            // new ImageminPlugin({
            //     disable: webpackMode === 'development', // Disable during development
            //     pngquant: {
            //         quality: '95-100'
            //     }
            // }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: '[name].[chunkhash].css',
                chunkFilename: '[id].[chunkhash].css',
                // ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),
            new webpack.DefinePlugin({
                DEV: webpackMode === 'development'
            }),
        ],
        devServer: {
            // to auto open
            open: true,
            historyApiFallback: true,
            port: 9009,
            // to be usable through network
            host: '0.0.0.0',
            compress: true,
            disableHostCheck: true,
            https: false,
            contentBase: "./dist",
            // hot: true,
            // inline: true,
            // watchContentBase: true
        },
    }

    return builtConfig
}

module.exports = ( env, argv ) => {
    const mode = argv.mode || 'production'
    return config( mode )
}