export const JsonPrimitiveSchema = {
  type: ['string', 'number', 'boolean', 'null']
}

export const JsonStructuredSchema = {
  type: ['object', 'array']
}

export const JsonTypesSchema = {
  anyOf: [JsonPrimitiveSchema, JsonStructuredSchema]
}

export const JsonRpc2IdSchema = {
  type: ['string', 'integer', 'null']
}

export const JsonRpc2VersionSchema = {
  const: '2.0'
}

export const JsonRpc2NotificationSchema = {
  type: 'object'
, required: ['jsonrpc', 'method']
, properties: {
    jsonrpc: JsonRpc2VersionSchema
  , method: { type: 'string' }
  , params: JsonTypesSchema
  }
}

export const JsonRpc2RequestSchema = {
  type: 'object'
, required: ['jsonrpc', 'id', 'method']
, properties: {
    jsonrpc: JsonRpc2VersionSchema
  , id: JsonRpc2IdSchema
  , method: { type: 'string' }
  , params: JsonTypesSchema
  }
}

export const JsonRpc2SuccessResponseSchema = {
  type: 'object'
, required: ['jsonrpc', 'id', 'result']
, properties: {
    jsonrpc: JsonRpc2VersionSchema
  , id: JsonRpc2IdSchema
  , result: JsonTypesSchema
  }
}

export const JsonRpc2ErrorSchema = {
  type: 'object'
, required: ['code', 'message']
, properties: {
    code: { type: 'integer' }
  , message: { type: 'string' }
  , data: JsonTypesSchema
  }
}

export const JsonRpc2ErrorResponseSchema = {
  type: 'object'
, required: ['jsonrpc', 'id', 'error']
, properties: {
    jsonrpc: JsonRpc2VersionSchema
  , id: JsonRpc2IdSchema
  , error: JsonRpc2ErrorSchema
  }
}

export const JsonRpc2BatchRequestSchema = {
  type: 'array'
, items: {
    anyOf: [JsonRpc2RequestSchema, JsonRpc2NotificationSchema]
  }
}

export const JsonRpc2BatchResponseSchema = {
  type: 'array'
, items: {
    anyOf: [JsonRpc2SuccessResponseSchema, JsonRpc2ErrorResponseSchema]
  }
}

export const JsonRpc2BatchSchema = {
  anyOf: [JsonRpc2BatchRequestSchema, JsonRpc2BatchResponseSchema]
}
