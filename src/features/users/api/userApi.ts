import { api } from "@/lib/axios";
import type { User } from "../types/user.types";
import type { ApiResponse } from '@/types/ApiResponse'

export const getMeApi = async (): Promise<ApiResponse<User>> => {
  const { data } = await api.post<ApiResponse<User>>("users/me");
  return data;
};
