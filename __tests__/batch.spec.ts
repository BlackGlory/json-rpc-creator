import { notification } from '@src/notification'
import { request } from '@src/request'
import { success } from '@src/success'
import { error } from '@src/error'
import { batch } from '@src/batch'

describe('batch<T extends Json | StructuredClone = Json>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>', () => {
  it('return Array<JsonRpcRequest<T> | JsonRpcNotification<T>>', () => {
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
})

describe('batch<T extends Json | StructuredClone = Json>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>', () => {
  it('return Array<JsonRpcResponse<T>>', () => {
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
})
