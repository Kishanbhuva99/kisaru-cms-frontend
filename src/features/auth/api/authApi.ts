import { api } from "@/lib/axios";
import type { ApiResponse } from '@/types/ApiResponse'
import type { Login, Register, ForgotPassword, ResetPassword, LoginResponse, RegisterResponse } from "../types/auth.types";

export const loginApi = async (payload: Login): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const registerApi = async (payload: Register): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", payload);
  return data;
};

export const forgotPasswordApi = async (payload: ForgotPassword): Promise<ApiResponse<null>> => {
  const { data } = await api.post<ApiResponse<null>>("/auth/forgot-password", payload);
  return data;
};

export const resetPasswordApi = async (resetToken: string ,payload: ResetPassword): Promise<ApiResponse<null>> => {
  const { data } = await api.post<ApiResponse<null>>(`/auth/reset-password/${resetToken}`, payload);
  return data;
};

export const logoutApi = async (): Promise<ApiResponse<null>> => {
  const { data } = await api.post<ApiResponse<null>>("/auth/logout",);
  return data;
};