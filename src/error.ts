import { Json, StructuredClone, JsonRpcId, JsonRpcError, JsonRpcErrorObject } from './typings'

export function error<T extends Json | StructuredClone = Json>(id: JsonRpcId, code: number, message: string, data?: T): JsonRpcError<T>
export function error<T extends Json | StructuredClone = Json>(id: JsonRpcId, error: JsonRpcErrorObject<T>): JsonRpcError<T>
export function error<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>
export function error<T extends Json | StructuredClone = Json>(idOrObj: JsonRpcId | Omit<JsonRpcError<T>, 'jsonrpc'>, errorOrCode?: JsonRpcErrorObject<T> | number, message?: string, data?: T): JsonRpcError<T> {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, errorOrCode!, message, data)
  }

  function normalize(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T> {
    return {
      jsonrpc: '2.0'
    , ...obj
    }
  }

  function create(id: JsonRpcId, errorOrCode: JsonRpcErrorObject<T> | number, message?: string, data?: T): JsonRpcError<T> {
    return {
      jsonrpc: '2.0'
    , id
    , error: getError()
    }

    function getError() {
      if (typeof errorOrCode === 'number') {
        const code = errorOrCode
        const result: JsonRpcErrorObject<T> = {
          code
        , message: message!
        }
        if (data !== undefined) result.data = data
        return result
      } else {
        const error = errorOrCode
        return error
      }
    }
  }
}
