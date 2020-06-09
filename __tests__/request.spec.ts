import { request } from '@src/request'

describe('request<T extends Json | StructuredClone>(id: Id, method: string, params?: Params<T>): IRequest<T>', () => {
  describe('params is undefined', () => {
    it('return IRequest', () => {
      const result = request(0, 'hello')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , method: 'hello'
      })
    })
  })

  describe('params isnt undefined', () => {
    const result = request(0, 'hello', ['world'])

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: ['world']
    })
  })
})
