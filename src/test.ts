import { deepStrictEqual, AssertionError } from 'assert'
import chalk from 'chalk'

const isAssertionError = (err: any): err is AssertionError =>
  err && err.code === 'ERR_ASSERTION'

const format = (message: string, ...stack: string[]) => {
  const lines = [`AssertionError: ${message}`, ...stack]
  return '\n' + lines.join('\n') + '\n'
}

const stringify = (x: any) => JSON.stringify(x, null, 4)

const formatAssertionErrorStack = (err: AssertionError) => [
  chalk.red(`- ${stringify(err.expected)}`),
  chalk.green(`+ ${stringify(err.actual)}`)
]

const formatErrorStack = (err: Error) => [
  err.stack ? chalk.red(err.stack) : ''
]

export default <T>(message: string, actual: T, expected: T) => {
  try {
    deepStrictEqual(actual, expected)
  } catch (err) {
    process.exitCode = 1
    const formatted = isAssertionError(err)
      ? format(message, ...formatAssertionErrorStack(err))
      : format(message, ...formatErrorStack(err))
    console.error(formatted)
  }
}
