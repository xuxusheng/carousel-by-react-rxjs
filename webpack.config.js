let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let autoprefixer = require('autoprefixer')


module.exports = function makeWebpackConfig() {
    
    let config = {}
    
    config.resolve = {
        modules: ['./node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }
    
    config.entry = {
        app: './src/index.tsx'
    }
    
    config.output = {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    
    config.module = {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader', options: {'cacheDirectory': true}
            }],
            exclude: [/node_modules/]
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: [/node_modules/]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: [
                    {loader: 'style-loader', options: {sourceMap: true}}
                ],
                use: [
                    {loader: 'css-loader', options: {modules: true, sourceMap: true}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            })
        }, {
            test: /\.(ico|woff|woff2|ttf|eot)(\?.+)?$/,
            use: [
                {loader: 'file-loader'}
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)(\?.+)?$/,
            use: [
                {loader: 'file-loader'}
            ]
        }]
    }
    
    config.plugins = [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            disable: false
        }),
        
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        brosers: ['last 10 version', '> 1%']
                    })
                ]
            }
        }),
        
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.js',
        //     minChunks: Infinity
        // })
    ]
    
    config.devServer = {
        historyApiFallback: {
            index: ''
        },
        host: '0.0.0.0',
        port: 8080
    }
    
    return config
}()