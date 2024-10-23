export interface Pageable<T> {
    data: T
    total: number
    page: number
    totalPages: number
}