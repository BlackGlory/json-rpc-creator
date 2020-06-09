import * as target from '@src/index'

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
