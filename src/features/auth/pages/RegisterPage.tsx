import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { FormInput } from '@/components/form/FormInput'
import { AuthCard } from '../components/AuthCard'
import { registerFormSchema, type RegisterForm } from '../validations/schemas'
import { useRegister } from '../hooks/useAuthHooks'

export default function RegisterPage() {
  // renamed so it isn't confused with react-hook-form's own `register`

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: '', email: '', phone: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  })

  const { mutate, isPending } = useRegister()

  const onSubmit = (v: RegisterForm) =>
    // send only what the API expects. confirmPassword stays in the form.
    mutate({ username: v.username, email: v.email, phone: v.phone, password: v.password })

  return (
    <AuthCard
      title="Create your account"
      description="Join Kisaru to read and write posts"
      footer={
        <span>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </span>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <FormInput
            control={form.control}
            name="username"
            label="Username"
            placeholder="johndoe"
            autoComplete="username"
            required
          />
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
            name="phone"
            label="Phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            required
          />
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type='password'
            description="6 to 16 characters"
            autoComplete="new-password"
            required
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm password"
            type='password'
            autoComplete="new-password"
            required
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}