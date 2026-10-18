import { useId, type ReactNode } from 'react'
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'

// here T is form's shape"
export interface BaseFieldProps<T extends FieldValues> {
  control: Control<T> //this is form.control of RHF
  name: Path<T> // path will allow only real field names of forms
  label?: string
  description?: string
  required?: boolean
}

interface FormFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  children: (args: {
    field: ControllerRenderProps<T, Path<T>>
    invalid: boolean
    id: string
  }) => ReactNode
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  children,
  required,
}: FormFieldProps<T>) {
  const uid = useId() // here we used react's useId ti generate unique id for fields
  const id = `${uid}-${name}` // here we combining id and name make it more unique

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          { label && <FieldLabel htmlFor={id}>{label}
          { required && <span className='text-destructive'>*</span>}
          </FieldLabel>}
          {children({ field, invalid: fieldState.invalid, id })}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}