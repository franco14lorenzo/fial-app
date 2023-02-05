import UserMenu from '@/components/Layout/UserMenu'

const HeaderBar = ({ showUserMenu = true }) => {
  return (
    <>
      <header className="fixed z-50 w-full h-16 bg-white border-b shadow-sm">
        <div className="flex flex-row items-center justify-between w-full h-full px-6 mx-auto max-w-7xl">
          <AppLogo />
          {showUserMenu && <UserMenu />}
        </div>
      </header>
    </>
  )
}

export default HeaderBar

const AppLogo = () => {
  return <h1 className="font-bold text-center text-slate-600">Fial App</h1>
}
