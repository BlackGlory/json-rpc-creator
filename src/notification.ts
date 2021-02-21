import { JsonRpcNotification, JsonRpcParams, isObject } from '@blackglory/types'

export function notification<T>(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T>
export function notification<T>(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T>
export function notification<T>(param: string | Omit<JsonRpcNotification<T>, 'jsonrpc'>, params?: JsonRpcParams<T>): JsonRpcNotification<T> {
  if (isObject(param)) {
    return normalize(param as Omit<JsonRpcNotification<T>, 'jsonrpc'>)
  } else {
    return create(param, params)
  }

  function create(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T> {
    const request: JsonRpcNotification<T> = {
      jsonrpc: '2.0'
    , method
    }
    if (params) request.params = params
    return request
  }

  function normalize(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T> {
    return {
      jsonrpc: '2.0'
    , ...obj
    }
  }
}
