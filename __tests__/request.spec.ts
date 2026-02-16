import { describe, test, expect } from 'vitest'
import { request } from '@src/request.js'
import { isJsonRpcRequest } from 'json-rpc-types'

test("request(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>", () => {
  const result = request({ id: 0, method: 'hello' })

  expect(result).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , method: 'hello'
  })
  expect(isJsonRpcRequest(result)).toBe(true)
})

describe('request(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>', () => {
  test('params is undefined', () => {
    const result = request(0, 'hello')

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    })
    expect(isJsonRpcRequest(result)).toBe(true)
  })

  test('params isnt undefined', () => {
    const result = request(0, 'hello', ['world'])

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: ['world']
    })
    expect(isJsonRpcRequest(result)).toBe(true)
  })
})
