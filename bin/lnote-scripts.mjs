#!/usr/bin/env node

import spawn from 'cross-spawn'

const args = process.argv.slice(2)

const script = args.shift()

const strategy = {
    start() {
        const [ , port = 4000 ] = args
        spawn.sync('npx', ['hexo', 'lfluid-server', '-p', port], { stdio: 'inherit' })
    },
    debug() {
        const [ , port = 4000 ] = args
        spawn.sync('npx', ['hexo', 'lfluid-start', '-p', port, '--debug'], { stdio: 'inherit' })
    },
    build() {
        spawn.sync('npx', ['hexo', 'clean', '&&', 'hexo', 'lfluid-build'], { stdio: 'inherit' })
    },
    clean() {
        spawn.sync('npx', ['hexo', 'clean'], { stdio: 'inherit' })
    },
    page() {
        const [ pagePath ] = args
        if (!pagePath) {
            console.log(`请输入新建页面路径/名称，如 "my/page"`)
            return
        }
        spawn.sync('npx', ['hexo', 'new', 'post', '--path', pagePath], { stdio: 'inherit' })
    },
    deploy() {
        spawn.sync('npx', ['hexo', 'deploy'], { stdio: 'inherit' })
    }
}

if (Object.keys(strategy).includes(script)) {
    strategy[script]()
} else {
    console.log(`Unknowscript script "${script}".`)
}
