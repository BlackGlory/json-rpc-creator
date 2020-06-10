import { success } from '@src/success'

describe("success<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcSuccessResponse<T>, 'jsonrpc'>): JsonRpcSuccessResponse<T>", () => {
  it('return JsonRpcSuccessResponse', () => {
    const result = success({ id: 0, result: 'ok' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    })
  })
})

describe('success<T extends Json | StructuredClone = Json>(id: JsonRpcId, result: T): JsonRpcSuccessResponse<T>', () => {
  it('return JsonRpcSuccessResponse', () => {
    const result = success(0, 'ok')

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    })
  })
})
