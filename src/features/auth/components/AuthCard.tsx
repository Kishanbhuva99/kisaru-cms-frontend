import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card>
         <CardHeader className="text-center">
           <CardTitle className="text-2xl">{title}</CardTitle>
           <CardDescription>{description}</CardDescription>
         </CardHeader>
         <CardContent>{children}</CardContent>
         {footer && (
           <CardFooter className="justify-center text-sm text-muted-foreground">
             {footer}
           </CardFooter>
         )}
       </Card>
  )
}