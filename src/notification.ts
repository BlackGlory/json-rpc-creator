export function notification<T extends Json | StructuredClone>(method: string, params?: Params<T>): INotification<T> {
  const request: INotification<T> = {
    jsonrpc: '2.0'
  , method
  }
  if (params) request.params = params
  return request
}
