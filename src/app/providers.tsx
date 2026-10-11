import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "../lib/queryClient";
import { AuthProvider } from "@/context/AuthContext/AuthProvider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      {children}
      </AuthProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}