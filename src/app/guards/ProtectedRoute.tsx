import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext/useAuth'
import { FullPageLoader } from '@/components/common/FullPageLoader'

export function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  //give the current location
  const location = useLocation();
// refresh token api call from authprovider still running then show loader
  if (isInitializing) return <FullPageLoader />

  // not authenticated then redirect to login with replace
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace state={{from : location}} />
  }
// renders nested childs
  return <Outlet/>
}