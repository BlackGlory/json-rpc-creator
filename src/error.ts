export function error<T extends Json | StructuredClone>(id: Id, error: IError<T>): IErrorResponse<T>
export function error<T extends Json | StructuredClone>(id: Id, code: number, message: string, data?: T): IErrorResponse<T>
export function error<T extends Json | StructuredClone>(id: Id, errorOrCode: IError<T> | number, message?: string, data?: T): IErrorResponse<T> {
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
