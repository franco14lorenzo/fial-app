import Head from 'next/head'
import LoginButton from '@/components/LoginButton'

export default function Home() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col w-screen h-screen">
        <header className="w-full h-16 border-b">
          <div className="flex flex-row items-center justify-between w-full h-full px-4 mx-auto max-w-7xl">
            <AppLogo />
            <LoginButton />
          </div>
        </header>
      </main>
    </>
  )
}

const AppLogo = () => {
  return <h1 className="mx-2 font-bold text-center text-slate-600">Fial App</h1>
}
