const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
    mode: 'production',
    entry: {
        'lnote-cmds': './src/lnote-cmds.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bin'),
        clean: true,
        chunkFormat: 'module',
        module: true,
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    externalsType: 'module',
});