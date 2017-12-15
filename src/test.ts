import * as path from 'path'
import * as concordance from 'concordance'
import chalk from 'chalk'

export default (filename: string) => {
  const file = path.relative(process.cwd(), filename)
  const start = process.hrtime()

  const ms = () => {
    const diff = process.hrtime(start)
    const ns = diff[0] * 1e9 + diff[1]
    return ns * 1e-6
  }

  const formatMs = (ms: number) =>
    chalk.yellow(`[${ms.toFixed(2)}ms]`)

  const formatTitle = (prefix: string) =>
    [prefix, chalk.cyan('»'), file, formatMs(ms())].join(' ')

  return <T>(message: string, actual: T, expected: T) => {
    const comparison = concordance.compare(actual, expected)
    if (!comparison.pass) {
      process.exitCode = 1
      const diff = concordance.diff(actual, expected)
      const title = formatTitle(chalk.red(`✖ ${message}`))
      console.error([title, diff].join('\n'))
    } else {
      console.log(formatTitle(chalk.green(`✔ ${message}`)))
    }
  }
}
