import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { User } from '@/features/users/types/user.types'
import { navItems } from './navConfig'

interface SidebarNavProps {
  role: User['role']
  onNavigate?: () => void // lets the mobile drawer close itself after a click
}

export function SidebarNav({ role, onNavigate }: SidebarNavProps) {
  const items = navItems.filter((item) => item.roles.includes(role))

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Dashboard">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-r-md border-l-2 border-transparent px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              isActive && 'border-brand bg-sidebar-accent text-sidebar-accent-foreground'
            )
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}