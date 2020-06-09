import { notification } from '@src/notification'

describe('notification<T extends Json | StructuredClone>(method: string, params?: Params<T>): INotification<T>', () => {
  describe('params is undefined', () => {
    it('return INotification', () => {
      const result = notification('hello')

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , method: 'hello'
      })
    })
  })

  describe('params isnt undefined', () => {
    it('return INotification', () => {
      const result = notification('hello', ['world'])

      expect(result).toStrictEqual({
        jsonrpc: '2.0'
      , method: 'hello'
      , params: ['world']
      })
    })
  })
})
