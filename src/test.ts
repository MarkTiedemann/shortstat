import { deepStrictEqual, AssertionError } from 'assert'
import chalk from 'chalk'

const isAssertionError = (err: any): err is AssertionError =>
  err && err.code === 'ERR_ASSERTION'

const logAssertionError = (message: string, err: AssertionError) => {
  const lines = [
    `AssertionError: ${message}`,
    chalk.red(`- ${JSON.stringify(err.expected, null, 4)}`),
    chalk.green(`+ ${JSON.stringify(err.actual, null, 4)}`)
  ]
  console.error('\n' + lines.join('\n') + '\n')
}

export default <T>(message: string, actual: T, expected: T) => {
  try {
    deepStrictEqual(actual, expected)
  } catch (err) {
    if (isAssertionError(err)) {
      logAssertionError(message, err)
    } else {
      throw err
    }
  }
}
