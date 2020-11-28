const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'

    },
    plugins: [
        new DotenvWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            }

        ]
    }
}