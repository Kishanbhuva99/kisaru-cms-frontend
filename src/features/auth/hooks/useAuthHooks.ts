import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext/useAuth'
import { registerApi, forgotPasswordApi, resetPasswordApi } from '../api/authApi'
import type { ResetPassword } from '../types/auth.types'

// Login changes auth state (token + user), so it goes through the context.
export function useLogin() {
  const { login } = useAuth()
  return useMutation({
    mutationFn: login,
    meta: { successMessage: 'Welcome back!' },
  })
}

// Register changes no auth state, so it's a plain API call.
export function useRegister() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: registerApi,
    meta: { successMessage: 'Account created! Please log in.' },
    onSuccess: () => navigate('/login', { replace: true }),
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordApi,
    meta: { successMessage: 'Reset link sent.' },
  })
}

// resetPasswordApi needs the token from the URL, so the hook takes it as an argument
export function useResetPassword(resetToken: string) {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (payload: ResetPassword) => resetPasswordApi(resetToken, payload),
    meta: { successMessage: 'Password reset! Please log in.' },
    onSuccess: () => navigate('/login', { replace: true }),
  })
}

export function useLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: logout,
    onMutate: () => navigate('/', { replace: true }),
    meta: { successMessage: 'Logged out successfully' },
  })
}