export interface IError {
    statusCode: number,
    message: string | string[],
    error?: string,
}