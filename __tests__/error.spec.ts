import { describe, test, expect } from 'vitest'
import { error } from '@src/error.js'
import { isJsonRpcError } from 'json-rpc-types'

test("error(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>", () => {
  const result = error({ id: 0, error: { code: 404, message: 'not found' }})

  expect(result).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , error: {
      code: 404
    , message: 'not found'
    }
  })
  expect(isJsonRpcError(result)).toBe(true)
})

test('error(id: JsonRpcId, error: JsonRpcErrorObject<T>): JsonRpcError<T>', () => {
  const result = error(0, { code: 404, message: 'not found' })

  expect(result).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , error: {
      code: 404
    , message: 'not found'
    }
  })
  expect(isJsonRpcError(result)).toBe(true)
})

describe('error(id: JsonRpcId, code: number, message: string, data?: T): JsonRpcError<T>', () => {
  test('data is undefined', () => {
    const result = error(0, 404, 'not found')

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'not found'
      }
    })
    expect(isJsonRpcError(result)).toBe(true)
  })

  test('data isnt undefined', () => {
    const result = error(0, 404, 'not found', { url: 'https://google.com' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'not found'
      , data: {
          url: 'https://google.com'
        }
      }
    })
    expect(isJsonRpcError(result)).toBe(true)
  })
})
