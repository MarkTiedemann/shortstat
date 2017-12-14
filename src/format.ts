import * as humanizeNumber from 'humanize-number'
import chalk from 'chalk'

import { Stats } from './ifaces'

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

  const pluralS = (n: number) => (n === 1 ? '' : 's')

  const { green, red } = chalk

  const lines = [
    green(`+  ${insertions}  insertion${pluralS(stats.insertions)}`),
    red(`-  ${deletions}  deletion${pluralS(stats.deletions)}`),
    `~  ${filesChanged}  file${pluralS(stats.filesChanged)} changed`
  ]

  return '\n' + lines.join('\n') + '\n'
}
