import { test, expect } from 'vitest'
import * as target from '@src/index.js'

test('exports', () => {
  const expected = [
    'notification'
  , 'request'

  , 'success'
  , 'error'

  , 'batch'
  ].sort()

  const exports = Object.keys(target).sort()

  expect(exports).toEqual(expected)
})
