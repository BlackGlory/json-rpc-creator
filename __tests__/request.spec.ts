import { request } from '@src/request'

describe("request<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>", () => {
  it('return JsonRpcRequest', () => {
    const result = request({ id: 0, method: 'hello' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    })
  })
})

describe('request<T extends Json | StructuredClone = Json>(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>', () => {
  describe('params is undefined', () => {
    it('return JsonRpcRequest', () => {
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
