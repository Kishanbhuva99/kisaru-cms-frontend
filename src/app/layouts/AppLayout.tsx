import { useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext/useAuth'
import { Header } from './Header'
import { MobileSidebar } from './MobileSidebar'
import { SidebarNav } from './SidebarNav'
import { SIDEBAR_ROLES } from './navConfig'

export default function AppLayout() {
  const { user } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // The role if this user gets a sidebar, otherwise null.
  // (Doing it this way also lets TypeScript know the role is real below.)
  const sidebarRole = user && SIDEBAR_ROLES.includes(user.role) ? user.role : null

  return (
    <div className="flex min-h-svh flex-col">
      <Header showMenuButton={!!sidebarRole} onMenuClick={() => setMobileNavOpen(true)} />

      <div className="flex flex-1">
        {sidebarRole && (
          <aside className="hidden w-60 shrink-0 border-r bg-sidebar lg:block">
            <SidebarNav role={sidebarRole} />
          </aside>
        )}
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {sidebarRole && (
        <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} role={sidebarRole} />
      )}
      <ScrollRestoration />
    </div>
  )
}