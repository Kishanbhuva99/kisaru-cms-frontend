import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext/useAuth";
import { FullPageLoader } from "@/components/common/FullPageLoader";


export const GuestOnlyRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  
  if (isInitializing) return <FullPageLoader />
  // is user is logged in then this will stop them accessing login ,register etc.. pages that can only be accessed by guests.
  if (isAuthenticated) return <Navigate to={'/'} replace />
  
  return <Outlet/>
}
