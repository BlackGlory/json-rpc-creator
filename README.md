# json-rpc-creator

JSON-RPC 2.0 data structures creator

## Install

```sh
npm install --save json-rpc-creator
# or
yarn add json-rpc-creator
```

## API

### notification

```ts
function notification<T extends Json | StructuredClone>(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T>
function notification<T extends Json | StructuredClone>(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T>
```

### request

```ts
function request<T extends Json | StructuredClone>(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>
function request<T extends Json | StructuredClone>(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>
```

### success

```ts
function success<T extends Json | StructuredClone>(id: JsonRpcId, result: T): JsonRpcSuccess<T>
function success<T extends Json | StructuredClone>(obj: Omit<JsonRpcSuccess<T>, 'jsonrpc'>): JsonRpcSuccess<T>
```

### error

```ts
function error<T extends Json | StructuredClone>(id: JsonRpcId, code: number, message: string, data?: T): JsonRpcError<T>
function error<T extends Json | StructuredClone>(id: JsonRpcId, error: JsonRpcErrorObject<T>): JsonRpcError<T>
function error<T extends Json | StructuredClone>(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>
```

### batch

```ts
function batch<T extends Json | StructuredClone>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>
function batch<T extends Json | StructuredClone>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>
```
