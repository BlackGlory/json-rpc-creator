export function notification<T extends Json | StructuredClone>(method: string, params?: Params<T>): INotification<T>
export function notification<T extends Json | StructuredClone>(obj: Omit<INotification<T>, 'jsonrpc'>): INotification<T>
export function notification<T extends Json | StructuredClone>(methodOrObj: string | Omit<INotification<T>, 'jsonrpc'>, params?: Params<T>): INotification<T> {
  if (methodOrObj !== null && typeof methodOrObj === 'object') {
    return normalize(methodOrObj)
  } else {
    return create(methodOrObj, params)
  }

  function create(method: string, params?: Params<T>): INotification<T> {
    const request: INotification<T> = {
      jsonrpc: '2.0'
    , method
    }
    if (params) request.params = params
    return request
  }

  function normalize(obj: Omit<INotification<T>, 'jsonrpc'>): INotification<T> {
    return Object.assign({ jsonrpc: '2.0' }, obj) as INotification<T>
  }
}
