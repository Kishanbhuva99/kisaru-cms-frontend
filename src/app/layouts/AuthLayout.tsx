import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/common/Logo'

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left: brand panel (hidden on phones and tablets) */}
      <div className="hidden flex-col justify-between bg-linear-to-br from-primary to-foreground p-10 text-primary-foreground  lg:flex">
        {/*<div className="hidden flex-col justify-between bg-linear-to-b from-blue-600 to-blue-900 p-10 text-primary-foreground lg:flex">*/}
        
        {/*<div className="text-xl font-semibold">Kisaru CMS</div>*/}
        <Logo/>
        <div className="space-y-2">
          <p className="text-2xl font-medium">Write. Review. Publish.</p>
          <p className="text-primary-foreground/70">
            A role-based publishing platform for authors, editors and readers.
          </p>
        </div>
      </div>

      {/* Right: whichever form page matches the URL */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}