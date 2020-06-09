import { success } from '@src/success'

describe("success<T extends Json | StructuredClone>(obj: Omit<ISuccessResponse<T>, 'jsonrpc'>): ISuccessResponse<T>", () => {
  it('return ISuccessResponse', () => {
    const result = success({ id: 0, result: 'ok' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    })
  })
})

describe('success<T extends Json | StructuredClone>(id: Id, result: T): ISuccessResponse<T>', () => {
  it('return ISuccessResponse', () => {
    const result = success(0, 'ok')

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    })
  })
})
