import UserMenu from '@/components/Layout/UserMenu'
import Link from 'next/link'

const HeaderBar = ({ showUserMenu = true }) => {
  return (
    <>
      <header className="fixed z-50 w-full h-16 bg-white border-b shadow-sm">
        <div className="flex flex-row items-center justify-between w-full h-full px-3 mx-auto max-w-7xl">
          <AppLogo />
          <nav className="flex flex-row items-center justify-between gap-2 md:gap-4">
            <Link
              href="/add-club"
              className="px-4 py-2 font-medium text-center rounded-full text-emerald-700 hover:bg-gray-100"
            >
              Suma tu Club
            </Link>
            {showUserMenu && <UserMenu />}
          </nav>
        </div>
      </header>
    </>
  )
}

export default HeaderBar

const AppLogo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-center text-slate-600 hover:text-slate-400"
    >
      Fial App
    </Link>
  )
}
