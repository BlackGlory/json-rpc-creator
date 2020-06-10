import { Json, StructuredClone, JsonRpcRequest, JsonRpcNotification, JsonRpcResponse } from './typings'

export function batch<T extends Json | StructuredClone = Json>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>
export function batch<T extends Json | StructuredClone = Json>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>
export function batch<T extends Json | StructuredClone = Json>(...requestsOrResponses: Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>> {
  return requestsOrResponses
}
