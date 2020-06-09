type Json =
  | string
  | number
  | boolean
  | null
  | { [index: string]: Json }
  | { [index: number]: Json }
  | Json[]

type StructuredClone =
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

type Id = string | number | null
type ParamsJson = Json[] | { [index: string]: Json }
type ParamsStructuredClone = StructuredClone[] | { [index: string]: StructuredClone }
type Params<T> = T extends StructuredClone ? ParamsStructuredClone : ParamsJson

interface INotification<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  method: string
  params?: Params<T>
}

interface IRequest<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: Id
  method: string
  params?: Params<T>
}

interface ISuccessResponse<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: Id
  result: T
}

interface IError<T extends Json | StructuredClone> {
  code: number
  message: string
  data?: T
}

interface IErrorResponse<T extends Json | StructuredClone> {
  jsonrpc: '2.0'
  id: Id
  error: IError<T>
}

type IResponse<T extends Json | StructuredClone> = ISuccessResponse<T> | IErrorResponse<T>
