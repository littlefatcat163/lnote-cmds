const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const WebpackObfuscator = require('webpack-obfuscator')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new WebpackObfuscator(
            {
                trasnformObjectKeys: true,
                rotateStringArray: true,
                roatetStringArrayEnable: true,
            },
            ['excluded_bundle_name.js']
        ),
    ],
});