import { QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
        successMessage?: string
      }
    }
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string') return message
  }
  return 'Something went wrong'
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
    mutations: {
      onError: (error) => {
        toast.error(getErrorMessage(error))
      },
      onSuccess: (_data, _variables, _context, mutation) => {
        const message = mutation?.meta?.successMessage;
        if (message)toast.success(message)
      },
    }
  }
})