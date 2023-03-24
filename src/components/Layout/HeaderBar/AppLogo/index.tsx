import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-center text-slate-600 hover:text-slate-400"
    >
      Fial App
    </Link>
  )
}

export default Logo
