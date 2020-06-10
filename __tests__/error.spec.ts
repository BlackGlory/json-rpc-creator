import { error } from '@src/error'

describe("error<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>", () => {
  it('return JsonRpcError', () => {
    const result = error({ id: 0, error: { code: 404, message: 'not found' }})

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'not found'
      }
    })
  })
})

describe('error<T extends Json | StructuredClone = Json>(id: Id, error: JsonRpcErrorObject<T>): JsonRpcError<T>', () => {
  it('return JsonRpcError', () => {
    const result = error(0, { code: 404, message: 'not found' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'not found'
      }
    })
  })
})

describe('error<T extends Json | StructuredClone = Json>(id: Id, code: number, message: string, data?: T): JsonRpcError<T>', () => {
  describe('data is undefined', () => {
    it('return JsonRpcError', () => {
      const result = error(0, 404, 'not found')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'not found'
        }
      })
    })
  })

  describe('data isnt undefined', () => {
    it('return JsonRpcError', () => {
      const result = error(0, 404, 'not found', { url: 'https://google.com' })

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'not found'
        , data: {
            url: 'https://google.com'
          }
        }
      })
    })
  })
})
