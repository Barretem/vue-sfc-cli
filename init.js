#! /usr/bin/env node

const { logger, kebabcasify } = require('./utils')
const FileActions = require('./lib/fileActions')
const kleur = require('kleur')
const path = require('path')
const readline = require('readline-sync')
const fs = require('fs')

const argv = process.argv.slice(2)

/**
 * Prompt user for input to populate template files
 */
const npmName = argv.includes('--test')
  ? 'v-test'
  : readline.question(
    '✍️  What is the npm name of your component? '
  )

const componentName = kebabcasify(npmName)
const outDir = path.join(process.cwd(), componentName)

const fileActions = new FileActions({
  componentName,
  outDir,
  templatesDir: path.join(__dirname, 'templates')
})

fileActions.create()

fileActions.move({
  patterns: {
    gitignore: '.gitignore',
    'package-json': 'package.json',
    'src/component.vue': `src/${componentName}.vue`
  }
})

fs.chmodSync(path.join(outDir, 'build.sh'), '755')

logger.success(`Generated into ${kleur.underline(outDir)}`)
