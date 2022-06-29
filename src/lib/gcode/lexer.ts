export interface TextLocation {
  line: number
  column: number
  length?: number
}

export class Word {
  constructor(
    public readonly location: TextLocation,
    public readonly value: string
  ) {}
}

export class CommentWord {
  constructor(
    public readonly location: TextLocation,
    public readonly value: string
  ) {}
}

export type Token = Word | Comment

export interface Line {
  lineNumber: number
  offset: number
  length: number
  source: string
  tokens: Token[]
}

export class LexerError extends Error {
  constructor(message: string, public readonly location: TextLocation) {
    super(message)
  }
}

export function lex(source: string): Line[] {
  let lines: Line[] = []

  let lineOffset = 0

  while (lineOffset < source.length) {
    lines.push(readLine(source, lineOffset, lines.length))
  }

  return lines
}

function readLine(source: string, offset: number, lineNumber: number): Line {
  let tokens: Word[] = []

  let i: number
  for (i = offset; i < source.length; i++) {
    if (isEndOfLine(source, 1)) break
    if (source[i] === '(') {
      let [token, length] = readComment(source, i)

      tokens.push(token)
      i += length
    }
  }

  return {
    lineNumber,
    source,
    offset,
    length: i - offset,
    tokens,
  }
}

function isEndOfLine(source: string, offset: number): boolean {
  if (source.length < offset)
    throw new LexerError('Read past end of source', {
      line: 0,
      column: 0,
    })
  if (source.length === offset) return true
  if (source[offset] === '\n') return true
  if (source[offset] === '\r' && source[offset + 1] === '\n') return true

  return false
}

function readComment(source: string, offset: number): [CommentWord, number] {
  return [new CommentWord({ line: 1, column: 0 }, 'foo'), 5]
}
