import { useState, type ComponentProps } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormField, type BaseFieldProps } from './FormField'

type FormInputProps<T extends FieldValues> = BaseFieldProps<T> &
  Omit<ComponentProps<typeof Input>, 'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'>

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  type,
  required,
  ...inputProps
}: FormInputProps<T>) {
  const [ showPassword, setshowPassword ] = useState(false)
  const isPassword = type === 'password';
  return (
    <FormField control={control} name={name} label={label} description={description} required={required}>
      {({ field, invalid, id }) => (
        <div className="relative">
          <Input {...inputProps} {...field} type={showPassword && isPassword ? 'text' : type} id={id} aria-invalid={invalid} className={isPassword ? "pr-10" : ""} />
          { isPassword && <button
            type="button"
            onClick={() => setshowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>}
        </div>
      )}
    </FormField>
  )
}
