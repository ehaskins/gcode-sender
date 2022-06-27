enum TokenType {
  Unknown,
  Text,
  Number,
  Comment,
}

interface Token<T extends TokenType = TokenType> {
  type: T
  source: string
  offset: number
  length: number
}
interface TextToken extends Token<TokenType.Text> {
  value: string
}
interface NumberToken extends Token<TokenType.Number> {
  value: number
}
interface CommentToken extends Token<TokenType.Comment> {
  value: string
}

interface Line {
  lineNumber: number
  offset: number
  length: number
  source: string
  tokens: Token[]
}

class LexerError extends Error {
  constructor(message: string, line: number, col: number) {
    super(message)
  }
}

function lex(source: string): Line[] {
  let lines: Line[] = []

  let lineOffset = 0

  while (lineOffset < source.length) {
    lines.push(this.readLine(source, lineOffset))
  }

  return lines
}

function readLine(source: string, offset: number, lineNumber: number): Line {
  let tokens: Token[] = []

  let i: number
  for (i = offset; i < source.length; i++) {
    if (isEndOfLine()) break
    if (source[i] === '(') {
      let [token, length] = readComment(source, i)

      this.tokens.push(token)
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
  if (source.length < offset) throw new LexerError()
  if (source.length === offset) return true
  if (source[offset] === '\n') return true
  if (source[offset] === '\r' && source[offset + 1] === '\n') return true

  return false
}

function readComment(source: string, offset: number): [CommentToken, number] {}
