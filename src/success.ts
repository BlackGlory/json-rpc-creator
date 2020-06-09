export function success<T extends Json | StructuredClone>(id: Id, result: T): ISuccessResponse<T>
export function success<T extends Json | StructuredClone>(obj: Omit<ISuccessResponse<T>, 'jsonrpc'>): ISuccessResponse<T>
export function success<T extends Json | StructuredClone>(idOrObj: Id | Omit<ISuccessResponse<T>, 'jsonrpc'>, result?: T): ISuccessResponse<T> {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, result!)
  }

  function create(id: Id, result: T): ISuccessResponse<T> {
    return {
      jsonrpc: '2.0'
    , id
    , result
    }
  }

  function normalize(obj: Omit<ISuccessResponse<T>, 'jsonrpc'>): ISuccessResponse<T> {
    return Object.assign({ jsonrpc: '2.0' }, obj) as ISuccessResponse<T>
  }
}
