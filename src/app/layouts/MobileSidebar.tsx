import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { User } from '@/features/users/types/user.types'
import { SidebarNav } from './SidebarNav'

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: User['role']
}

export function MobileSidebar({ open, onOpenChange, role }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <SidebarNav role={role} onNavigate={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  )
}