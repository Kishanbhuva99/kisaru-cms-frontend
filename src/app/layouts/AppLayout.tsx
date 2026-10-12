import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      {/* navbar/sidebar goes here later */}
      <Outlet />
    </div>
  )
}