#!/usr/bin/env node

/*
 * Hastilude
 * Tool for mucking about with JWT tokens
 */

'use strict'

const program = require('commander')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const packageJson = require('../package.json')

const log = console.log

program
    .version(packageJson.version)

program
    .command('generate')
    .description('Generate a JWT token')
    .option('-s --secret <secret>', 'Secret Key')
    .option('-p --payload <payload>', 'JWT payload')
    .option('-e --expires [expires]', 'Expire token')
    .option('-h --http', 'Output in HTTP Auth style')
    .action((options) => {
        let expires = options.expires || '30m'
        let payloadString = fs.readFileSync(options.payload)
        let payload = JSON.parse(payloadString)
        let jwt_token = jwt.sign(payload, options.secret, { expiresIn: expires })

        if(options.http) {
            return log(`Authorization:Bearer ${jwt_token}`)
        }

        return log(chalk.green(jwt_token))
    })

program
    .command('dismantle')
    .description('Decode a JWT token')
    .option('-t --token <token>', 'JWT')
    .option('-h --header', 'Display Header')
    .action((options) => {
        let decoded = jwt.decode(options.token, { complete: true })

        if(options.header) {
            log(chalk.white('# Header'))
            log(chalk.gray(JSON.stringify(decoded.header, null, 2)))
            log('')
        }

        log(chalk.white('# Payload'))
        log(chalk.cyan(JSON.stringify(decoded.payload, null, 2)))
    })

program.parse(process.argv)
