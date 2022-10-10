export interface IResponseAPI<T> {
    data: T,
    status: number,
    error?: boolean
  }
  