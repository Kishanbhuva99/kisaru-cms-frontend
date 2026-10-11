import type { User } from '@/features/users/types/user.types'

export interface LoginResponse {
  status: string
  message: string
  data: User
  accessToken: string
}

export interface RegisterResponse {
  status: string
  message: string
  data: User
}

export type Login = {
  email: string,
  password: string
}

export type Register ={
  username: string,
  email: string,
  phone: string,
  password: string,
}


export type ForgotPassword ={
  email: string,
}

export type ResetPassword = {
  newPassword: string
}


