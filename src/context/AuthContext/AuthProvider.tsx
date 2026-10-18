import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { tokenStore } from "@/lib/tokenStore";
import { AuthContext } from "./AuthContext";
import type { Login } from "@/features/auth/types/auth.types";
import { getMeApi } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types/user.types";
import { loginApi, logoutApi } from "@/features/auth/api/authApi";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Runs once when the app loads. The access token lives only in memory,
  // before deciding the user is logged out we call the refresh api to get fresh accesstoken.
  useEffect(() => {
    async function restoreSession() {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        // refresh call using axios so if it get 401 then interceptor wont make second refresh call.
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true })
        tokenStore.setToken(data.accessToken)
        //after getting token ,calling me api to get logged in users details and set it to state.
        const me = await getMeApi()
        setUser(me.data) 
      } catch {
        // refresh fail we clear the token.
         tokenStore.clearToken()
      } finally {
        setIsInitializing(false)
      }
    }
    restoreSession()
  }, [])

  // axios can't call useAuth() — it's not a component. 
  // So when a refresh fails inside the interceptor,
  // it dispatches this browser event instead, and AuthContext listens for it to clear state.
  useEffect(() => {
    function handleAuthExpired() {
      setUser(null)
    }
    // listens the envey of axios and calls the function
    window.addEventListener('auth:expired', handleAuthExpired)
    // cleanup function
    return () => window.removeEventListener('auth:expired', handleAuthExpired)
  }, [])
//login call and set the token and user data
  const login = async (payload: Login) => {
    const response = await loginApi(payload)
    tokenStore.setToken(response.accessToken)
    setUser(response.data)
  }

// logout call
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      // clear user state and token even if the API call fails like network issue, etc.
      tokenStore.clearToken()
      setUser(null)
    }
  }

  return (
    //context provider with values
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isInitializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
