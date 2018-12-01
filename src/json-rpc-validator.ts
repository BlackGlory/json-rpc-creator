import * as Ajv from 'ajv'
import {
  JsonRpc2NotificationSchema
, JsonRpc2RequestSchema
, JsonRpc2SuccessResponseSchema
, JsonRpc2ErrorResponseSchema
, JsonRpc2BatchSchema
} from './json-rpc-schema'

export function validateNotification(data: any) {
  const ajv = new Ajv()

  if (!ajv.validate(JsonRpc2NotificationSchema, data)) {
    throw new Error(ajv.errorsText())
  }

  return true
}

export function validateRequest(data: any) {
  const ajv = new Ajv()

  if (!ajv.validate(JsonRpc2RequestSchema, data)) {
    throw new Error(ajv.errorsText())
  }

  return true
}

export function validateSuccess(data: any) {
  const ajv = new Ajv()

  if (!ajv.validate(JsonRpc2SuccessResponseSchema, data)) {
    throw new Error(ajv.errorsText())
  }

  return true
}

export function validateError(data: any) {
  const ajv = new Ajv()

  if (!ajv.validate(JsonRpc2ErrorResponseSchema, data)) {
    throw new Error(ajv.errorsText())
  }

  return true
}

export function validateBatch(data: any) {
  const ajv = new Ajv()

  if (!ajv.validate(JsonRpc2BatchSchema, data)) {
    throw new Error(ajv.errorsText())
  }

  return true
}
