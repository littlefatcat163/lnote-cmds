const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    target: 'node',
    externals: {
        lodash: 'lodash',
        'cross-spawn': 'cross-spawn',
        systeminformation: 'systeminformation',
        'lnote-esm': 'lnote-esm'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/**/*'],
            verbose: true,
            dry: false
        }),
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
    ]
}
