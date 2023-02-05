import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import MainMap from '@/components/Screens/Home/MainMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      <main className="w-full h-full mx-auto max-w-7xl pt-[63px]">
        <section className="fixed z-0 w-full h-full mx-auto max-w-7xl">
          <MainMap />
        </section>
        <section className="w-full max-w-7xl mx-auto h-[2000px] bg-white shadow shadow-black/20 rounded-t-3xl absolute top-[540px] z-10">
          <div className="w-10 h-1 mx-auto my-4 bg-gray-400 rounded-full"></div>
        </section>
      </main>
    </>
  )
}
