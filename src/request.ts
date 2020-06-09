export function request<T extends Json | StructuredClone>(id: Id, method: string, params?: Params<T>): IRequest<T> {
  const request: IRequest<T> = {
    jsonrpc: '2.0'
  , id
  , method
  }
  if (params) request.params = params
  return request
}
