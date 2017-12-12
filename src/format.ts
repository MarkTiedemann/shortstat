import * as humanizeNumber from 'humanize-number'
import chalk from 'chalk'

import { Stats } from './stats'

export default (stats: Stats): string => {
  const humanized = [
    stats.filesChanged,
    stats.insertions,
    stats.deletions
  ].map(n => humanizeNumber(n))

  const padding = humanized
    .map(x => x.length)
    .sort()
    .pop() as number

  const padded = humanized.map(x => x.padStart(padding))

  const [filesChanged, insertions, deletions] = padded

  const { green, red } = chalk

  const formatted = [
    green(`+  ${insertions}  ::  insertions`),
    red(`-  ${deletions}  ::  deletions`),
    `~  ${filesChanged}  ::  files changed`
  ].join('\n')

  return '\n' + formatted + '\n'
}
