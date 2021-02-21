import { JsonRpcId, JsonRpcRequest, JsonRpcParams, isObject } from '@blackglory/types'

export function request<T>(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>
export function request<T>(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>
export function request<T>(param: JsonRpcId | Omit<JsonRpcRequest<T>, 'jsonrpc'>, method?: string, params?: JsonRpcParams<T>) {
  if (isObject(param)) {
    return normalize(param as Omit<JsonRpcRequest<T>, 'jsonrpc'>)
  } else {
    return create(param, method!, params!)
  }

  function create(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T> {
    const request: JsonRpcRequest<T> = {
      jsonrpc: '2.0'
    , id
    , method
    }
    if (params) request.params = params
    return request
  }

  function normalize(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T> {
    return {
      jsonrpc: '2.0'
    , ...obj
    }
  }
}
