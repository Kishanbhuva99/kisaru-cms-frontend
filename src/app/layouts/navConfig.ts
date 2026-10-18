import { ClipboardCheck, FileText, PenSquare, Users, type LucideIcon } from 'lucide-react'
import type { User } from '@/features/users/types/user.types'

type Role = User['role']

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  roles: Role[]
}

// Readers (and guests) get no sidebar
export const SIDEBAR_ROLES: Role[] = ['author', 'editor', 'admin']

export const navItems: NavItem[] = [
  { label: 'My Posts', to: '/my-posts', icon: FileText, roles: ['author', 'editor', 'admin'] },
  { label: 'New Post', to: '/posts/new', icon: PenSquare, roles: ['author', 'editor', 'admin'] },
  { label: 'Pending Review', to: '/pending-review', icon: ClipboardCheck, roles: ['editor', 'admin'] },
  { label: 'Manage Users', to: '/admin/users', icon: Users, roles: ['admin'] },
]