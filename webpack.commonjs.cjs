const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
    mode: 'production',
    entry: {
        'lnote-eachUtil': './src/lnote-eachUtil.ts'
    },
    output: {
        filename: '[name].cjs',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            type: 'commonjs'
        }
    },
    experiments: {
        outputModule: false
    },
    externalsType: 'commonjs',
});