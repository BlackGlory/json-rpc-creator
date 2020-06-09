import { error } from '@src/error'

describe("error<T extends Json | StructuredClone>(obj: Omit<IErrorResponse<T>, 'jsonrpc'>): IErrorResponse<T>", () => {
  it('return IErrorResponse', () => {
    const result = error({ id: 0, error: { code: 404, message: 'Not Found' }})

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'Not Found'
      }
    })
  })
})

describe('error<T extends Json | StructuredClone>(id: Id, error: IError<T>): IErrorResponse<T>', () => {
  it('return IErrorResponse', () => {
    const result = error(0, { code: 404, message: 'Not Found' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'Not Found'
      }
    })
  })
})

describe('error<T extends Json | StructuredClone>(id: Id, code: number, message: string, data?: T): IErrorResponse<T>', () => {
  describe('data is undefined', () => {
    it('return IErrorResponse', () => {
      const result = error(0, 404, 'Not Found')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'Not Found'
        }
      })
    })
  })

  describe('data isnt undefined', () => {
    it('return IErrorResponse', () => {
      const result = error(0, 404, 'Not Found', { url: 'https://google.com' })

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'Not Found'
        , data: {
            url: 'https://google.com'
          }
        }
      })
    })
  })
})
