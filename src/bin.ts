#!/usr/bin/env node

import * as path from 'path'
import * as cp from 'child_process'
import * as rl from 'readline'

import * as minimist from 'minimist'
import * as minimistOptions from 'minimist-options'

import { Stats } from './ifaces'
import parse from './parse'
import format from './format'

const options = minimistOptions({
  author: { type: 'string' },
  branch: { type: 'string' }
})

const argv = process.argv.slice(2)
const { _, author, branch } = minimist(argv, options)

const authorArgs = author ? ['--author', author] : []
const branchArgs = branch ? ['-b', branch] : []
const cwd = _.length > 0 ? path.resolve(..._) : process.cwd()

const git = cp.spawn(
  'git',
  ['log', ...authorArgs, ...branchArgs, '--shortstat'],
  { cwd }
)

git.stderr.pipe(process.stderr)

const readline = rl.createInterface(git.stdout)

const totalStats: Stats = {
  filesChanged: 0,
  insertions: 0,
  deletions: 0
}

readline.on('line', line => {
  const lineStats = parse(line)
  totalStats.filesChanged += lineStats.filesChanged
  totalStats.insertions += lineStats.insertions
  totalStats.deletions += lineStats.deletions
})

git.on('close', code => {
  if (code !== 0) process.exit(code)
  else process.stdout.write(format(totalStats))
})
