import { Stats } from './ifaces'

const parse = (line: string) => (regExp: RegExp): number => {
  if (!line) return 0
  const match = regExp.exec(line)
  if (!match || match.length < 2) return 0
  return parseInt(match[1])
}

export default (line: string): Stats => {
  // Shortstat lines begin with a space
  if (!line.startsWith(' '))
    return { filesChanged: 0, insertions: 0, deletions: 0 }

  const parser = parse(line.trim())
  return {
    filesChanged: parser(/(\d+) file/),
    insertions: parser(/(\d+) insertion/),
    deletions: parser(/(\d+) deletion/)
  }
}
