import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { tokenStore } from './tokenStore'

const baseURL = import.meta.env.VITE_API_BASE_URL
//axios instance base url setup
export const api = axios.create({
  baseURL,
  withCredentials: true,
})

// request interceptor with token attached
api.interceptors.request.use((config) => {
  const token = tokenStore.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
// pending queue to store requests with their resolve and reject functions
let pendingQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  // process the pending queue with the new token or error
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      // reject initiate the reject functions with the error that we added from the interceptor
      reject(error)
    } else {
      // resolve initiate the resolve functions with the new token that we added from the interceptor
      resolve(token)
    }
  })
  pendingQueue = []
}
// response interceptor with token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // here storing the original request and adding a _retry flag using insertions (&)
    // InternalAxiosRequestConfig is a type AxiosRequestConfig
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }
    // if the error is not a 401 or the request has already been retried, reject the second request Promise
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }
    // here token refresh is in progress, so we queue the requests and wait for the token to be refreshed
    if (isRefreshing) {
      // here we are creating a new Promise that will be resolved when the token is refreshed or rejected if an error occurs
      return new Promise((resolve, reject) => {
        // here we are pushing the original request into the pending queue with the resolve and reject functions
        pendingQueue.push({
          // store the resolve and reject functions in the pending queue
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          },
          reject,
        })
      })
    }
    // here for the first time we are marking the request as retried so it won't be retried again for other request
    originalRequest._retry = true
    isRefreshing = true

    try {
      // here we are making the token refresh request with axios
      // we used direct axios call here to avoid the axios instance interceptors
      const { data } = await axios.post(
        `${baseURL}/auth/refresh`,
        {}, // empty request body
        { withCredentials: true }
      )
      const newToken = data.accessToken 
      // set the new token in the token store and process the pending queue
      tokenStore.setToken(newToken)
      // resolve the pending queue with the new token
      processQueue(null, newToken)
      // set the new token in the original request headers
      originalRequest.headers.Authorization = `Bearer ${newToken}`
      // make the original request with the new token
      return api(originalRequest)
    } catch (refreshError) {
      // reject the pending queue requests with the refresh error
      processQueue(refreshError, null)
      tokenStore.clearToken()
      // reject the original request with the refresh error
      return Promise.reject(refreshError)
    } finally {
      // clear the refreshing flag
      isRefreshing = false
    }
  }
)
