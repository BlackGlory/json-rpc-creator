import { JsonRpcId, JsonRpcError, JsonRpcErrorObject, isObject, isNumber, isntUndefined } from '@blackglory/types'

export function error<T>(id: JsonRpcId, code: number, message: string, data?: T): JsonRpcError<T>
export function error<T>(id: JsonRpcId, error: JsonRpcErrorObject<T>): JsonRpcError<T>
export function error<T>(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>
export function error<T>(param: JsonRpcId | Omit<JsonRpcError<T>, 'jsonrpc'>, errorOrCode?: JsonRpcErrorObject<T> | number, message?: string, data?: T): JsonRpcError<T> {
  if (isObject(param)) {
    return normalize(param as Omit<JsonRpcError<T>, 'jsonrpc'>)
  } else {
    return create(param, errorOrCode!, message, data)
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
    , error: getError(errorOrCode)
    }

    function getError(errorOrCode: JsonRpcErrorObject<T> | number) {
      if (isNumber(errorOrCode)) {
        const code = errorOrCode
        const result: JsonRpcErrorObject<T> = {
          code
        , message: message!
        }
        if (isntUndefined(data)) result.data = data
        return result
      } else {
        const error = errorOrCode
        return error
      }
    }
  }
}
