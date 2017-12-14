import test from './test'
import format from './format'
import chalk from 'chalk'

test(
  'Should format singular',
  format({ deletions: 1, insertions: 1, filesChanged: 1 }),
  `
${chalk.green('+  1  insertion')}
${chalk.red('-  1  deletion')}
~  1  file changed
`
)

test(
  'Should format plural',
  format({ deletions: 2, insertions: 2, filesChanged: 2 }),
  `
${chalk.green('+  2  insertions')}
${chalk.red('-  2  deletions')}
~  2  files changed
`
)

test(
  'Should humanize and pad',
  format({
    insertions: 1000 * 1000,
    deletions: 0,
    filesChanged: 1
  }),
  `
${chalk.green('+  1,000,000  insertions')}
${chalk.red('-          0  deletions')}
~          1  file changed
`
)
