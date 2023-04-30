import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-2xl mr-2">🎾</span>
      <span className="font-medium text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-500 tracking-tighter">
        FialApp
      </span>
    </Link>
  )
}

export default Logo
