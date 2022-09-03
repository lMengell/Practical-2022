export interface BaseResponse<T> {
    totalItems: number;
    items: T;
}