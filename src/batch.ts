export function batch<T extends Json | StructuredClone>(...requests: Array<IRequest<T> | INotification<T>>): Array<IRequest<T> | INotification<T>>
export function batch<T extends Json | StructuredClone>(...responses: Array<IResponse<T>>): Array<IResponse<T>>
export function batch<T extends Json | StructuredClone>(...requestsOrResponses: Array<IRequest<T> | INotification<T>> | Array<IResponse<T>>): Array<IRequest<T> | INotification<T>> | Array<IResponse<T>> {
  return requestsOrResponses
}
