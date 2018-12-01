import {
  validateNotification
, validateRequest
, validateSuccess
, validateError
, validateBatch
} from './json-rpc-validator'

export type JsonPrimitive = string | number | boolean | null
export type JsonStructure = object | any[]
export type JsonTypes = JsonPrimitive | JsonStructure

export type JsonRpc2Id = string | number | null
export type JsonRpc2Params = JsonTypes

export interface JsonRpc2Notification {
  jsonrpc: '2.0'
  method: string
  params?: JsonRpc2Params
}

export interface JsonRpc2Request {
  jsonrpc: '2.0'
  id: JsonRpc2Id
  method: string
  params?: JsonRpc2Params
}

export interface JsonRpc2SuccessResponse {
  jsonrpc: '2.0'
  id: JsonRpc2Id
  result: any
}

export interface JsonRpc2Error {
  code: number
  message: string
  data?: any
}

export interface JsonRpc2ErrorResponse {
  jsonrpc: '2.0'
  id: JsonRpc2Id
  error: JsonRpc2Error
}

export type JsonRpc2Response = JsonRpc2SuccessResponse | JsonRpc2ErrorResponse

export function notification(method: string, params?: JsonRpc2Params): JsonRpc2Notification {
  const request: JsonRpc2Notification = {
    jsonrpc: '2.0'
  , method
  }

  if (params !== undefined) {
    request.params = params
  }

  validateNotification(request)

  return request
}

export function request(id: JsonRpc2Id, method: string, params?: JsonRpc2Params): JsonRpc2Request {
  const request: JsonRpc2Request = {
    jsonrpc: '2.0'
  , id
  , method
  }

  if (params !== undefined) {
    request.params = params
  }

  validateRequest(request)

  return request
}

export function success(id: JsonRpc2Id, result: JsonTypes): JsonRpc2SuccessResponse {
  const response: JsonRpc2SuccessResponse = {
    jsonrpc: '2.0'
  , id
  , result
  }

  validateSuccess(response)

  return response
}

export function error(id: JsonRpc2Id, error: JsonRpc2Error): JsonRpc2ErrorResponse
export function error(id: JsonRpc2Id, code: number, message: string, data?: JsonTypes): JsonRpc2ErrorResponse
export function error(id: JsonRpc2Id, errorOrCode: JsonRpc2Error | number, message?: string, data?: JsonTypes): JsonRpc2ErrorResponse {
  let error: JsonRpc2Error
  if (typeof errorOrCode === 'number') {
    const code = errorOrCode as number
    error = {
      code
    , message: message as string
    }

    if (data !== undefined) {
      error.data = data
    }
  } else {
    error = errorOrCode as JsonRpc2Error
  }

  const response: JsonRpc2ErrorResponse = {
    jsonrpc: '2.0'
  , id
  , error
  }

  validateError(response)
  return response
}

export function batch(...responses: JsonRpc2Response[]): JsonRpc2Response[]
export function batch(...requests: Array<JsonRpc2Request | JsonRpc2Notification>): Array<JsonRpc2Request | JsonRpc2Notification>
export function batch(...requestsOrResponses: Array<JsonRpc2Request | JsonRpc2Notification> | JsonRpc2Response[]): Array<JsonRpc2Request | JsonRpc2Notification> | JsonRpc2Response[] {
  validateBatch(requestsOrResponses)

  return requestsOrResponses
}
