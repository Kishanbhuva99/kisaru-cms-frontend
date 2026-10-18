import { createContext } from "react";
import type { Login } from "@/features/auth/types/auth.types";
import type { User } from "@/features/users/types/user.types";

// auth context interface
interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (payload: Login) => Promise<void>
  logout: () => Promise<void>
}
// auth context created using AuthContextValue interface
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)


