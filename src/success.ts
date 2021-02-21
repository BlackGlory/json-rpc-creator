import { JsonRpcId, JsonRpcSuccess, isObject } from '@blackglory/types'

export function success<T>(id: JsonRpcId, result: T): JsonRpcSuccess<T>
export function success<T>(obj: Omit<JsonRpcSuccess<T>, 'jsonrpc'>): JsonRpcSuccess<T>
export function success<T>(param: JsonRpcId | Omit<JsonRpcSuccess<T>, 'jsonrpc'>, result?: T): JsonRpcSuccess<T> {
  if (isObject(param)) {
    return normalize(param as Omit<JsonRpcSuccess<T>, 'jsonrpc'>)
  } else {
    return create(param, result!)
  }

  function create(id: JsonRpcId, result: T): JsonRpcSuccess<T> {
    return {
      jsonrpc: '2.0'
    , id
    , result
    }
  }

  function normalize(obj: Omit<JsonRpcSuccess<T>, 'jsonrpc'>): JsonRpcSuccess<T> {
    return {
      jsonrpc: '2.0'
    , ...obj
    }
  }
}
