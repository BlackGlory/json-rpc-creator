import { JsonRpcId, JsonRpcSuccess } from '@blackglory/types'

export function success<T>(id: JsonRpcId, result: T): JsonRpcSuccess<T>
export function success<T>(obj: Omit<JsonRpcSuccess<T>, 'jsonrpc'>): JsonRpcSuccess<T>
export function success<T>(idOrObj: JsonRpcId | Omit<JsonRpcSuccess<T>, 'jsonrpc'>, result?: T): JsonRpcSuccess<T> {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, result!)
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
