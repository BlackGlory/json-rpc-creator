import { Json, StructuredClone, JsonRpcNotification, JsonRpcParams } from './typings'

export function notification<T extends Json | StructuredClone>(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T>
export function notification<T extends Json | StructuredClone>(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T>
export function notification<T extends Json | StructuredClone>(methodOrObj: string | Omit<JsonRpcNotification<T>, 'jsonrpc'>, params?: JsonRpcParams<T>): JsonRpcNotification<T> {
  if (methodOrObj !== null && typeof methodOrObj === 'object') {
    return normalize(methodOrObj)
  } else {
    return create(methodOrObj, params)
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
    return Object.assign({ jsonrpc: '2.0' }, obj) as JsonRpcNotification<T>
  }
}
