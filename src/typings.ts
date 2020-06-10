export type Json =
  | string
  | number
  | boolean
  | null
  | { [index: string]: Json }
  | { [index: number]: Json }
  | Json[]

export type StructuredClone =
  | boolean
  | null
  | undefined
  | number
  | BigInt
  | string
  | Boolean
  | String
  | Date
  | RegExp
  | Blob
  | File
  | FileList
  | ArrayBuffer
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | ArrayBufferView
  | ImageBitmap
  | ImageData
  | StructuredClone[]
  | { [index: string]: StructuredClone }
  | { [index: number]: StructuredClone }
  | Map<StructuredClone, StructuredClone>
  | Set<StructuredClone>

export type JsonRpcId = string | number | null
export type JsonRpcParamsJson = Json[] | { [index: string]: Json }
export type JsonRpcParamsStructuredClone = StructuredClone[] | { [index: string]: StructuredClone }
export type JsonRpcParams<T> = T extends StructuredClone ? JsonRpcParamsStructuredClone : JsonRpcParamsJson

export interface JsonRpcNotification<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  method: string
  params?: JsonRpcParams<T>
}

export interface JsonRpcRequest<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: JsonRpcId
  method: string
  params?: JsonRpcParams<T>
}

export interface JsonRpcSuccess<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: JsonRpcId
  result: T
}

export interface JsonRpcErrorObject<T extends Json | StructuredClone> {
  code: number
  message: string
  data?: T
}

export interface JsonRpcError<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: JsonRpcId
  error: JsonRpcErrorObject<T>
}

export type JsonRpcResponse<T extends Json | StructuredClone> = JsonRpcSuccess<T> | JsonRpcError<T>
