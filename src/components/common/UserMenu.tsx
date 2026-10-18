import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext/useAuth'
import { useLogout } from '@/features/auth/hooks/useAuthHooks'

export function UserMenu() {
  const { user } = useAuth()
  const { mutate: logout, isPending } = useLogout()

  if (!user) return null

  return (
    <DropdownMenu>
      {/* Base UI uses the `render` prop where Radix used `asChild` */}
      <DropdownMenuTrigger
        className='cursor-pointer'
        render={<Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu" />}
      >
        <Avatar className="size-8">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* In Base UI, a Label must sit inside a Group or it throws */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate text-sm font-medium text-foreground">{user.username}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
            <p className="text-xs font-normal capitalize text-muted-foreground">{user.role}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => logout()} disabled={isPending}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}