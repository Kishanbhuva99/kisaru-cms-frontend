import { type Pagination } from "./Pagination";
export interface ApiResponse<T> {
  status: string,
  message: string,
  data: T,
  pagination?: Pagination,
}

export interface ErrorResponse {
  status: string,
  message: string,
}