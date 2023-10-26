import CryptoJS from 'crypto-js'
import { createSecret } from 'create-lnote/src/encDec'
import { encryptData } from 'create-lnote/src/generate'
import { readLicenseEnc, cmdEnc, scriptWordingEnc } from '../generate'

describe('test generate', () => {
    test('readLicenseEnc', () => {
        const warnings = {
            filename: '_config.yml',
            encode: 'utf-8'
        }
        expect(readLicenseEnc()).toEqual(warnings)
    })
    test('cmdEnc', () => {
        const command = 'npx'
        const options = { stdio: 'inherit' }
        const warnings = {
            start: {
                command,
                options,
                args: ['hexo', 'bd6810898c6d3aaebc9a8c779bfedbdfdc3dac44d6e38d9624b7a80d851dfd230ff03739119d1df9bf3f2497604e789969d1846316c2853ba45f961b77e69614', '-p']
            },
            debug: {
                command,
                options,
                args: ['hexo', 'bd6810898c6d3aaebc9a8c779bfedbdfdc3dac44d6e38d9624b7a80d851dfd230ff03739119d1df9bf3f2497604e789969d1846316c2853ba45f961b77e69614', '-p']
            },
            build: {
                command,
                options,
                args: ['hexo', 'clean', '&&', 'hexo', '62ca25dbe39babfbdb48542f55146778943cff2b6ad7becf510b4263caebdf00a94ee0e8199f7a571990f1f25077a4c7ec65e22ae495a90caf7b380c95682bf2', '-p']
            },
            clean: {
                command,
                options,
                args: ['hexo', 'clean']
            },
            page: {
                command,
                options,
                args: ['hexo', 'new', 'post', '--path']
            },
            deploy: {
                command,
                options,
                args: ['hexo', 'deploy']
            }
        }
        expect(cmdEnc()).toEqual(warnings)
    })
    test('scriptWordingEnc', () => {
        const warnings = {
            filenameEmpty: '请输入新建页面路径/名称，如 "my/page"',
            unknowScript: 'Unknowscript script'
        }
        expect(scriptWordingEnc()).toEqual(warnings)
    })
})

describe('target generate', () => {
    /* test('readLicenseFile', () => {
        // readLicenseFile
        const secret = createSecret()
        const warnings = {
            filename: '_config.yml',
            encode: 'utf-8'
        }
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('readLicenseFile...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('hexo console', () => {
        console.log(CryptoJS.SHA3('lnote-lfluid-start').toString())
        console.log(CryptoJS.SHA3('lnote-lfluid-build').toString())
    }) */
    /* test('hexo console command', () => {
        // cmdEnc
        const secret = createSecret()
        const command = 'npx'
        const options = { stdio: 'inherit' }
        const warnings = {
            start: {
                command,
                options,
                args: ['hexo', 'bd6810898c6d3aaebc9a8c779bfedbdfdc3dac44d6e38d9624b7a80d851dfd230ff03739119d1df9bf3f2497604e789969d1846316c2853ba45f961b77e69614', '-p']
            },
            debug: {
                command,
                options,
                args: ['hexo', 'bd6810898c6d3aaebc9a8c779bfedbdfdc3dac44d6e38d9624b7a80d851dfd230ff03739119d1df9bf3f2497604e789969d1846316c2853ba45f961b77e69614', '-p']
            },
            build: {
                command,
                options,
                args: ['hexo', 'clean', '&&', 'hexo', '62ca25dbe39babfbdb48542f55146778943cff2b6ad7becf510b4263caebdf00a94ee0e8199f7a571990f1f25077a4c7ec65e22ae495a90caf7b380c95682bf2', '-p']
            },
            clean: {
                command,
                options,
                args: ['hexo', 'clean']
            },
            page: {
                command,
                options,
                args: ['hexo', 'new', 'post', '--path']
            },
            deploy: {
                command,
                options,
                args: ['hexo', 'deploy']
            }
        }
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('hexo console command...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('scriptWordingEnc', () => {
        // scriptWordingEnc
        const secret = createSecret()
        const warnings = {
            filenameEmpty: '请输入新建页面路径/名称，如 "my/page"',
            unknowScript: 'Unknowscript script'
        }
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('scriptWordingEnc...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
})