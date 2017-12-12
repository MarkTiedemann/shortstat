#!/usr/bin/env node

import { spawn } from 'child_process'
import { createInterface } from 'readline'

import * as minimist from 'minimist'
import * as minimistOptions from 'minimist-options'

import { Stats } from './stats'
import parse from './parse'
import format from './format'

const options = minimistOptions({
  cwd: {
    type: 'string',
    default: process.cwd()
  },
  author: {
    type: 'string'
  },
  branches: {
    type: 'string'
  }
})

const { cwd, author, branch } = minimist(process.argv, options)

const authorArgs = author ? ['--author', author] : []
const branchArgs = branch ? ['--branches', branch] : []

const git = spawn(
  'git',
  ['log', ...authorArgs, ...branchArgs, '--shortstat'],
  { cwd }
)

git.stderr.pipe(process.stderr)

const readline = createInterface(git.stdout)

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
