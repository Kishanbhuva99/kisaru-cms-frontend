import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import { UserMenu } from '@/components/common/UserMenu'
import { useAuth } from '@/context/AuthContext/useAuth'

interface HeaderProps {
  showMenuButton: boolean // only for roles that have a sidebar
  onMenuClick: () => void
}

export function Header({ showMenuButton, onMenuClick }: HeaderProps) {
  const { isAuthenticated, isInitializing } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        )}

        <Logo />

        <div className="ml-auto flex items-center gap-2">
          {isInitializing ? (
            // Still checking the session on page load. Without this placeholder,
            // a logged-in user would see "Log in / Sign up" flash on every F5.
            <div className="size-8 animate-pulse rounded-full bg-muted" />
          ) : isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className={buttonVariants({ variant: 'ghost' })}>
                Log in
              </Link>
              <Link to="/register" className={buttonVariants()}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}