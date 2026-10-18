import { createBrowserRouter } from "react-router-dom"; 
//layouts
import AppLayout from "./layouts/AppLayout";

//guards
// import { ProtectedRoute } from "./guards/ProtectedRoute";
import { GuestOnlyRoute } from "./guards/GuestOnlyRoute";
// import { RoleCheckedRoute } from "./guards/RoleCheckedRoute";

//layouts
import AuthLayout from "@/app/layouts/AuthLayout";

//pages
import HomePage from "@/features/posts/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnuthorizedPage";

export const router = createBrowserRouter([
  //this path for guestonly routes
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        element: <AuthLayout/>,
        children: [
          { path: '/login', element: <LoginPage/>},
          { path: '/register', element: <RegisterPage/>},
        ]
      }
    ]
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> }, 
      { path: '/unauthorized', element: <UnauthorizedPage /> }, 
      // protected routes inside protected element
      // { path: '/my-posts', element: <Myposts /> }, 
      ]
  },
  { path: '*', element: <NotFoundPage /> },
])