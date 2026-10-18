import { Navigate, Outlet, useLocation, type Location } from "react-router-dom";
import { useAuth } from "@/context/AuthContext/useAuth";
import { FullPageLoader } from "@/components/common/FullPageLoader";


export const GuestOnlyRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation()
  
  if (isInitializing) return <FullPageLoader />
  // is user is logged in then this will stop them accessing login ,register etc.. pages that can only be accessed by guests.
  if (isAuthenticated){
      // ProtectedRoute stored the page they were trying to reach in `state.from`
      const from = (location.state as { from?: Location } | null)?.from
      return <Navigate to={from ?? '/'} replace />
    }
  return <Outlet/>
}
