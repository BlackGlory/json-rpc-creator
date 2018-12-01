import {
  notification
, request
, success
, error
, batch
} from '../src/json-rpc-creator'

test('notification(method, params?)', () => {
  expect(notification('hello')).toStrictEqual({
    jsonrpc: '2.0'
  , method: 'hello'
  })

  expect(notification('hello', 'world')).toStrictEqual({
    jsonrpc: '2.0'
  , method: 'hello'
  , params: 'world'
  })
})

test('request(id, method, params?)', () => {
  expect(request(0, 'hello')).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , method: 'hello'
  })

  expect(request(0, 'hello', 'world')).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , method: 'hello'
  , params: 'world'
  })
})

test('success(id, result)', () => {
  expect(success(0, 'ok')).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , result: 'ok'
  })
})

test('error(id, code, message, data?)', () => {
  expect(error(0, 404, 'not found')).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , error: {
      code: 404
    , message: 'not found'
    }
  })

  expect(error(0, 404, 'not found', { url: 'https://google.com' })).toStrictEqual({
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

test('error(id, error)', () => {
  expect(error(0, {
    code: 404
  , message: 'not found'
  })).toStrictEqual({
    jsonrpc: '2.0'
  , id: 0
  , error: {
      code: 404
    , message: 'not found'
    }
  })
})

test('batch(...(requests | responses))', () => {
  expect(batch()).toStrictEqual([])

  expect(batch(
    notification('hello')
  , request(0, 'hello')
  )).toStrictEqual([
    {
      jsonrpc: '2.0'
    , method: 'hello'
    }
  , {
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    }
  ])

  batch(
    success(0, 'ok')
  , error(1, 404, 'not found')
  )

  expect(batch(
    success(0, 'ok')
  , error(1, 404, 'not found')
  )).toStrictEqual([
    {
      jsonrpc: '2.0'
    , id: 0
    , result: 'ok'
    }
  , {
      jsonrpc: '2.0'
    , id: 1
    , error: {
        code: 404
      , message: 'not found'
      }
    }
  ])
})
