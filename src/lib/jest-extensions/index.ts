import type { MatcherState } from 'expect'
import { expect } from '@jest/globals'

type Predicate<T> = (value: T, index: number, array: T[]) => boolean

interface SyncExpectationResult {
  pass: boolean
  message(): string
}

type ExpectationResult = SyncExpectationResult | Promise<SyncExpectationResult>

export function toSatisfyAll<T>(
  this: MatcherState,
  actual: T[],
  predicate: Predicate<T>
): ExpectationResult {
  const { printReceived, printExpected, matcherHint } = this.utils

  for (let [i, entry] of actual.entries()) {
    if (predicate(entry, i, actual) === false) {
      return {
        pass: false,
        message: () =>
          matcherHint('.toSatisfyAll') +
          '\n\n' +
          'Expected array to satisfy predicate for all values.\n' +
          `Received (first failed index: ${i}):\n` +
          `  ${printReceived(actual)}`,
      }
    }
  }

  return {
    pass: true,
    message: () =>
      matcherHint('.not.toSatisfyAll') +
      '\n\n' +
      'Expected array to not satisfy predicate for all values.\n' +
      'Received:\n' +
      `  ${printReceived(actual)}`,
  }
}

expect.extend({
  toSatisfyAll,
})

declare module 'expect' {
  interface AsymmetricMatchers {
    toSatisfyAll<T>(predicate: Predicate<T>): void
  }
  interface Matchers<R> {
    toSatisfyAll<T>(predicate: Predicate<T>): R
  }
}
