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

const log = console.log

program
    .version('0.0.1')

program
    .command('generate')
    .description('Generate a JWT token')
    .option('-s --secret <secret>', 'Secret Key')
    .option('-p --payload <payload>', 'JWT payload')
    .option('-e --expires [expires]', 'Expire token')
    .action((options) => {
        let expires = options.expires || '30m'
        let payloadString = fs.readFileSync(options.payload)
        let payload = JSON.parse(payloadString)
        let jwt_token = jwt.sign(payload, options.secret, { expiresIn: expires })
        log(chalk.green(jwt_token))
    })

program.parse(process.argv)
