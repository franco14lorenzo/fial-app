import Head from 'next/head'
import UserMenu from '@/components/UserMenu'
import MainMap from '@/components/MainMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed z-50 w-full h-16 bg-white border-b shadow-sm">
        <div className="flex flex-row items-center justify-between w-full h-full px-6 mx-auto max-w-7xl">
          <AppLogo />
          <UserMenu />
        </div>
      </header>
      <main className="w-full h-full mx-auto max-w-7xl pt-[63px]">
        <MainMap />
        <section className="w-full max-w-7xl mx-auto h-[2000px] bg-white shadow shadow-black/20 rounded-t-3xl absolute top-[540px] z-10">
          <div className="w-10 h-1 mx-auto my-4 bg-gray-400 rounded-full"></div>
        </section>
      </main>
    </>
  )
}

const AppLogo = () => {
  return <h1 className="font-bold text-center text-slate-600">Fial App</h1>
}
