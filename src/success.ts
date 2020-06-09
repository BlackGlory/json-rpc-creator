export function success<T extends Json | StructuredClone>(id: Id, result: T): ISuccessResponse<T> {
  return {
    jsonrpc: '2.0'
  , id
  , result
  }
}
