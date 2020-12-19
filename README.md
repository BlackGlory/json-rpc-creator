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
function notification<T>(method: string, params?: JsonRpcParams<T>): JsonRpcNotification<T>
function notification<T>(obj: Omit<JsonRpcNotification<T>, 'jsonrpc'>): JsonRpcNotification<T>
```

### request

```ts
function request<T>(id: JsonRpcId, method: string, params?: JsonRpcParams<T>): JsonRpcRequest<T>
function request<T>(obj: Omit<JsonRpcRequest<T>, 'jsonrpc'>): JsonRpcRequest<T>
```

### success

```ts
function success<T>(id: JsonRpcId, result: T): JsonRpcSuccess<T>
function success<T>(obj: Omit<JsonRpcSuccess<T>, 'jsonrpc'>): JsonRpcSuccess<T>
```

### error

```ts
function error<T>(id: JsonRpcId, code: number, message: string, data?: T): JsonRpcError<T>
function error<T>(id: JsonRpcId, error: JsonRpcErrorObject<T>): JsonRpcError<T>
function error<T>(obj: Omit<JsonRpcError<T>, 'jsonrpc'>): JsonRpcError<T>
```

### batch

```ts
function batch<T>(...requests: Array<JsonRpcRequest<T> | JsonRpcNotification<T>>): Array<JsonRpcRequest<T> | JsonRpcNotification<T>>
function batch<T>(...responses: Array<JsonRpcResponse<T>>): Array<JsonRpcResponse<T>>
```
