import spawn from 'cross-spawn'
import type { SpawnOptions } from 'child_process'
import yaml from 'yaml'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { validateLicenses } from 'create-lnote/src/generate'
import { readLicenseEnc, cmdEnc, scriptWordingEnc } from './generate'

function readLicenses(): string[] {
    try {
        const generatePath = path.resolve(process.cwd())
        const enc = readLicenseEnc()
        const configPath = `${generatePath}/${enc.filename}`
        const config: any = yaml.parse(fs.readFileSync(configPath, enc.encode))
        return config.lnote_licenses
    } catch (error) {
        return []
    }
}

type StrategyPayload = {
    command: string
    options: SpawnOptions
    args: readonly string[]
}

const strategy = {
    start({ command, options, args }: StrategyPayload) {
        const [, port = '4000'] = __args
        spawn.sync(command, [...args, port], options)
    },
    debug({ command, options, args }: StrategyPayload) {
        const [, port = '4000'] = __args
        spawn.sync(command, [...args, port], options)
    },
    build({ command, options, args }: StrategyPayload, cmdCtx: any) {
        const cleanCmd = cmdCtx.clean as StrategyPayload
        spawn.sync(cleanCmd.command, cleanCmd.args, cleanCmd.options)
        
        spawn.sync(command, args, options)
    },
    clean({ command, options, args }: StrategyPayload) {
        spawn.sync(command, args, options)
    },
    page({ command, options, args }: StrategyPayload) {
        const [pagePath] = __args
        if (!pagePath) {
            console.log(chalk.red(wording.filenameEmpty))
            return
        }
        spawn.sync(command, [...args, pagePath], options)
    },
    deploy({ command, options, args }: StrategyPayload) {
        spawn.sync(command, args, options)
    },
}

type ScriptCommand = keyof typeof strategy

const __args = process.argv.slice(2)

const script = __args.shift() as ScriptCommand

const wording = scriptWordingEnc()

async function runCommand() {
    if (Object.keys(strategy).includes(script)) {
        try {
            await validateLicenses(readLicenses())
            const cmdCtx = cmdEnc()
            strategy[script](cmdCtx[script], cmdCtx)
        } catch (error) {
            console.log(chalk.red(error))
        }
    } else {
        console.log(chalk.red(`${wording.unknowScript} "${script}".`))
    }
}

runCommand()
