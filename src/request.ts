import { Json, StructuredClone, JsonRpcId, JsonRpcRequest, JsonRpcParams } from './typings'

export function request<T extends Json | StructuredClone = Json>(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>
export function request<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>
export function request<T extends Json | StructuredClone = Json>(idOrObj: JsonRpcId | Omit<JsonRpcRequest<T>, 'jsonrpc'>, method?: string, params?: JsonRpcParams<T>) {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, method!, params!)
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
    return Object.assign({ jsonrpc: '2.0' }, obj) as JsonRpcRequest<T>
  }
}
