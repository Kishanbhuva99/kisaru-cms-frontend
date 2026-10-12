import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext/useAuth"
import type { User } from "@/features/users/types/user.types"

type Role = User['role'];

export const RoleCheckedRoute = ({ allowedRoles }: { allowedRoles: Role[] }) => {
  const { user } = useAuth();//get the user data from Auth context
// check if there no user or user role is not from allowedRole array
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={'/unauthorized'} replace />
  }
  
  return <Outlet/>
}
