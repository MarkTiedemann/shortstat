import { Stats } from './ifaces'

const parse = (line: string) => (regExp: RegExp): number => {
  if (!line) return 0
  const match = regExp.exec(line)
  if (!match || match.length < 2) return 0
  return parseInt(match[1])
}

export default (line: string): Stats => {
  const parser = parse(line.trim())
  return {
    filesChanged: parser(/(\d+) file/g),
    insertions: parser(/(\d+) insertion/g),
    deletions: parser(/(\d+) deletion/g)
  }
}
