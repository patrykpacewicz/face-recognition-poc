var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/react/index.jsx',
    output: { path: __dirname + '/build/resources/main/public/static', filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname + '/src/react',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '']
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};