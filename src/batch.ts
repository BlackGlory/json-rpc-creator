import { Json, StructuredClone, JsonRpcRequest, JsonRpcNotification, JsonRpcResponse } from './typings'

export function batch<T extends Json | StructuredClone>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>
export function batch<T extends Json | StructuredClone>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>
export function batch<T extends Json | StructuredClone>(...requestsOrResponses: Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>> {
  return requestsOrResponses
}
