import {
  validateNotification
, validateRequest
, validateSuccess
, validateError
, validateBatch
} from '../src/json-rpc-validator'
import { produce } from 'immer'

test('validateNotification(data)', () => {
  const data: any = {
    jsonrpc: '2.0'
  , method: 'foo'
  , params: 'bar'
  }

  expect(validateNotification(data)).toBeTruthy()

  expect(() => validateNotification(produce(data, draft => {
    delete draft.jsonrpc
  }))).toThrow()

  expect(() => validateNotification(produce(data, draft => {
    draft.jsonrpc = '1.0'
  }))).toThrow()

  expect(() => validateNotification(produce(data, draft => {
    delete draft.method
  }))).toThrow()

  expect(() => validateNotification(produce(data, draft => {
    draft.method = 0
  }))).toThrow()

  expect(() => validateNotification(produce(data, draft => {
    delete draft.params
  }))).not.toThrow()

  expect(() => validateNotification(produce(data, draft => {
    draft.params = Symbol()
  }))).toThrow()
})

test('validateRequest(data)', () => {
  const data: any = {
    jsonrpc: '2.0'
  , id: 0
  , method: 'foo'
  , params: 'bar'
  }

  expect(validateRequest(data)).toBeTruthy()

  expect(() => validateRequest(produce(data, draft => {
    delete draft.jsonrpc
  }))).toThrow()
  expect(() => validateRequest(produce(data, draft => {
    draft.jsonrpc = '1.0'
  }))).toThrow()

  expect(() => validateRequest(produce(data, draft => {
    delete draft.id
  }))).toThrow()
  expect(() => validateRequest(produce(data, draft => {
    draft.id = Symbol()
  }))).toThrow()

  expect(() => validateRequest(produce(data, draft => {
    delete draft.method
  }))).toThrow()
  expect(() => validateRequest(produce(data, draft => {
    draft.method = 0
  }))).toThrow()

  expect(() => validateRequest(produce(data, draft => {
    delete draft.params
  }))).not.toThrow()
  expect(() => validateRequest(produce(data, draft => {
    draft.params = Symbol()
  }))).toThrow()
})

test('validateSuccess(data)', () => {
  const data: any = {
    jsonrpc: '2.0'
  , id: 0
  , result: 'foo'
  }

  expect(validateSuccess(data)).toBeTruthy()

  expect(() => validateSuccess(produce(data, draft => {
    delete draft.jsonrpc
  }))).toThrow()
  expect(() => validateSuccess(produce(data, draft => {
    draft.jsonrpc = '1.0'
  }))).toThrow()

  expect(() => validateSuccess(produce(data, draft => {
    delete draft.id
  }))).toThrow()
  expect(() => validateSuccess(produce(data, draft => {
    draft.id = Symbol()
  }))).toThrow()

  expect(() => validateSuccess(produce(data, draft => {
    delete draft.result
  }))).toThrow()
  expect(() => validateSuccess(produce(data, draft => {
    draft.result = Symbol()
  }))).toThrow()
})

test('validateError(data)', () => {
  const data: any = {
    jsonrpc: '2.0'
  , id: 0
  , error: {
      code: 404
    , message: 'Not Found'
    , data: {
        line: 0
      , column: 0
      }
    }
  }

  expect(validateError(data)).toBeTruthy()

  expect(() => validateError(produce(data, draft => {
    delete draft.jsonrpc
  }))).toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.jsonrpc = '1.0'
  }))).toThrow()

  expect(() => validateError(produce(data, draft => {
    delete draft.id
  }))).toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.id = Symbol()
  }))).toThrow()

  expect(() => validateError(produce(data, draft => {
    delete draft.error
  }))).toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.error = Symbol()
  }))).toThrow()

  expect(() => validateError(produce(data, draft => {
    delete draft.error.code
  }))).toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.error.code = '404'
  }))).toThrow()

  expect(() => validateError(produce(data, draft => {
    delete draft.error.message
  }))).toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.error.message = 0
  }))).toThrow()

  expect(() => validateError(produce(data, draft => {
    delete draft.error.data
  }))).not.toThrow()
  expect(() => validateError(produce(data, draft => {
    draft.error = Symbol()
  }))).toThrow()
})

test('validateBatch(data)', () => {
  const data: any = [
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
  ] // all responses

  expect(validateBatch(data)).toBeTruthy()

  expect(() => validateBatch(produce(data, draft => {
    draft.push({
      jsonrpc: '2.0'
    , method: 'foo'
    , params: 'bar'
    }) // mixin requests
  }))).toThrow()
})
