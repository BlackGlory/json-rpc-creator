import { error } from '@src/error'

describe('error<T extends Json | StructuredClone>(id: Id, error: IError<T>): IErrorResponse<T>', () => {
  it('return IErrorResponse', () => {
    const result = error(0, { code: 404, message: 'Not found' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , error: {
        code: 404
      , message: 'Not found'
      }
    })
  })
})

describe('error<T extends Json | StructuredClone>(id: Id, code: number, message: string, data?: T): IErrorResponse<T>', () => {
  describe('data is undefined', () => {
    it('return IErrorResponse', () => {
      const result = error(0, 404, 'Not found')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'Not found'
        }
      })
    })
  })

  describe('data isnt undefined', () => {
    it('return IErrorResponse', () => {
      const result = error(0, 404, 'Not found', { url: 'https://google.com' })

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'Not found'
        , data: {
            url: 'https://google.com'
          }
        }
      })
    })
  })
})
