export function error<T extends Json | StructuredClone>(id: Id, code: number, message: string, data?: T): IErrorResponse<T>
export function error<T extends Json | StructuredClone>(id: Id, error: IError<T>): IErrorResponse<T>
export function error<T extends Json | StructuredClone>(obj: Omit<IErrorResponse<T>, 'jsonrpc'>): IErrorResponse<T>
export function error<T extends Json | StructuredClone>(idOrObj: Id | Omit<IErrorResponse<T>, 'jsonrpc'>, errorOrCode?: IError<T> | number, message?: string, data?: T): IErrorResponse<T> {
  if (idOrObj !== null && typeof idOrObj === 'object') {
    return normalize(idOrObj)
  } else {
    return create(idOrObj, errorOrCode!, message, data)
  }

  function normalize(obj: Omit<IErrorResponse<T>, 'jsonrpc'>): IErrorResponse<T> {
    return Object.assign({ jsonrpc: '2.0' }, obj) as IErrorResponse<T>
  }

  function create(id: Id, errorOrCode: IError<T> | number, message?: string, data?: T): IErrorResponse<T> {
    return {
      jsonrpc: '2.0'
    , id
    , error: getError()
    }

    function getError() {
      if (typeof errorOrCode === 'number') {
        const code = errorOrCode
        const result: IError<T> = {
          code
        , message: message!
        }
        if (data !== undefined) result.data = data
        return result
      } else {
        const error = errorOrCode
        return error
      }
    }
  }
}
