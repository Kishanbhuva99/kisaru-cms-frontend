import { useContext } from "react"
import { AuthContext } from "./AuthContext"
//useAuth that uses the context and check if context exist or not.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}