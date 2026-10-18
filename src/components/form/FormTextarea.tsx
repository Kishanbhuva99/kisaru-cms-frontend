import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { FormField, type BaseFieldProps } from './FormField'

type FormTextareaProps<T extends FieldValues> = BaseFieldProps<T> &
  Omit<ComponentProps<typeof Textarea>, 'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'>

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: FormTextareaProps<T>) {
  return (
    <FormField control={control} name={name} label={label} description={description}>
      {({ field, invalid, id }) => (
        <Textarea {...props} {...field} id={id} aria-invalid={invalid} />
      )}
    </FormField>
  )
}