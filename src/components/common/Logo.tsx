import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Kisaru CMS home">
      {/* hanko (印鑑) seal style */}
      <span className="flex size-8 items-center justify-center rounded-sm bg-brand font-heading text-sm font-bold  text-white">
        キ
      </span>
      <span className="font-heading text-xl font-bold tracking-wide">Kisaru</span>
    </Link>
  )
}