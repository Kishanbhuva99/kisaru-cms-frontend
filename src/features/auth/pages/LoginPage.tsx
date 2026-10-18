import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { FormInput } from '@/components/form/FormInput'
import { AuthCard } from '../components/AuthCard'
import { loginSchema } from '../validations/schemas'
import type { Login } from '../types/auth.types'
import { useLogin } from '../hooks/useAuthHooks'

export default function LoginPage() {

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const { mutate, isPending } = useLogin()

  return (
    <AuthCard
      title="Welcome back"
      description="Log in to your Kisaru account"
      footer={
        <span>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </span>
      }
    >
      {/* noValidate: turn off the browser's own popups, Zod handles it */}
      <form onSubmit={form.handleSubmit((values) => mutate(values))} noValidate>
        <FieldGroup>
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}