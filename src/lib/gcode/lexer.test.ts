import { CommentWord, lex, Word } from './lexer'
import { test, expect } from '@jest/globals'

const lines: Array<[string, Word[]]> = [
  [
    'G90(absolute coordinates)',
    [
      new Word({ line: 0, column: 0, length: 3 }, 'G90'),
      new CommentWord(
        { line: 0, column: 3, length: 22 },
        'absolute coordinates'
      ),
    ],
  ],
]

test.each(lines)('lines should lex correctly', (line, words) => {
  let lexed = lex(line)

  expect(lexed.length).toBe(words.length)

  expect(lexed).toSatisfyAll<Word>((actual, i) => {
    let expected = words[i]

    return actual.value === expected.value
  })
})
