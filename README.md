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
function notification<T extends Json | StructuredClone>(method: string, params?: Params<T>): INotification<T>
function notification<T extends Json | StructuredClone>(obj: Omit<INotification<T>, 'jsonrpc'>): INotification<T>
```

### request

```ts
function request<T extends Json | StructuredClone>(id: Id, method: string, params?: Params<T>): IRequest<T>
function request<T extends Json | StructuredClone>(obj: Omit<IRequest<T>, 'jsonrpc'>): IRequest<T>
```

### success

```ts
function success<T extends Json | StructuredClone>(id: Id, result: T): ISuccessResponse<T>
function success<T extends Json | StructuredClone>(obj: Omit<ISuccessResponse<T>, 'jsonrpc'>): ISuccessResponse<T>
```

### error

```ts
function error<T extends Json | StructuredClone>(id: Id, code: number, message: string, data?: T): IErrorResponse<T>
function error<T extends Json | StructuredClone>(id: Id, error: IError<T>): IErrorResponse<T>
function error<T extends Json | StructuredClone>(obj: Omit<IErrorResponse<T>, 'jsonrpc'>): IErrorResponse<T>
```

### batch

```ts
function batch<T extends Json | StructuredClone>(...requests: Array<IRequest<T> | INotification<T>>): Array<IRequest<T> | INotification<T>>
function batch<T extends Json | StructuredClone>(...responses: Array<IResponse<T>>): Array<IResponse<T>>
```
