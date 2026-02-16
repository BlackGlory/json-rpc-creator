import { test, expect } from 'vitest'
import { notification } from '@src/notification.js'
import { request } from '@src/request.js'
import { success } from '@src/success.js'
import { error } from '@src/error.js'
import { batch } from '@src/batch.js'

test('batch(requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>', () => {
  const result = batch(
    notification('hello')
  , request(0, 'hello')
  )

  expect(result).toStrictEqual([
    {
      jsonrpc: '2.0'
    , method: 'hello'
    }
  , {
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    }
  ])
})

test('batch(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>', () => {
  const result = batch(
    success(0, 'ok')
  , error(1, 404, 'not found')
  )

  expect(result).toStrictEqual([
    {
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    }
  , {
      jsonrpc: '2.0'
    , id: 1
    , error: {
        code: 404
      , message: 'not found'
      }
    }
  ])
})
