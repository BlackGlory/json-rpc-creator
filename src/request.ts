export function request<T extends Json | StructuredClone>(id: Id, method: string, params?: Params<T>): IRequest<T>
export function request<T extends Json | StructuredClone>(obj: Omit<IRequest<T>, 'jsonrpc'>): IRequest<T>
export function request<T extends Json | StructuredClone>(idOrObj: Id | Omit<IRequest<T>, 'jsonrpc'>, method?: string, params?: Params<T>) {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, method!, params!)
  }

  function create(id: Id, method: string, params?: Params<T>): IRequest<T> {
    const request: IRequest<T> = {
      jsonrpc: '2.0'
    , id
    , method
    }
    if (params) request.params = params
    return request
  }

  function normalize(obj: Omit<IRequest<T>, 'jsonrpc'>): IRequest<T> {
    return Object.assign({ jsonrpc: '2.0' }, obj) as IRequest<T>
  }
}
