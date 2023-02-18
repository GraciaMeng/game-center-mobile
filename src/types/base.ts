export interface PageInterface<T> {
  list: T[]
  pagination: {
    page: number
    pages: number
    size: number
    total: number
  }
}
