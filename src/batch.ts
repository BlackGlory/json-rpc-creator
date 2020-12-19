import { JsonRpcRequest, JsonRpcNotification, JsonRpcResponse } from '@blackglory/types'

export function batch<T>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>
export function batch<T>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>
export function batch<T>(...requestsOrResponses: Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>> | Array<JsonRpcResponse<T>> {
  return requestsOrResponses
}
