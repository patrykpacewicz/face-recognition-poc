var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main/react/index.jsx',
    output: {
        path: __dirname + '/build/resources/main/public',
        filename: 'static/[chunkhash:8].bundle.js',
        chunkFilename: 'static/[contenthash:8].bundle.chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname + '/src/main/react',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('static/[contenthash:8].styles.css'),
        new HtmlWebpackPlugin({
            inject: true,
            template: "build/resources/main/index.html"
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};