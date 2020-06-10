import { notification } from '@src/notification'

describe("notification<T extends Json | StructuredClone = Json>(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T>", () => {
  it('return JsonRpcNotification', () => {
    const result = notification({ method: 'hello' })

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , method: 'hello'
    })
  })
})

describe('notification<T extends Json | StructuredClone = Json>(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T>', () => {
  describe('params is undefined', () => {
    it('return JsonRpcNotification', () => {
      const result = notification('hello')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , method: 'hello'
      })
    })
  })

  describe('params isnt undefined', () => {
    it('return JsonRpcNotification', () => {
      const result = notification('hello', ['world'])

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , method: 'hello'
      , params: ['world']
      })
    })
  })
})
