import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import MainMap from '@/components/Screens/Home/MainMap'
import ClubList from '@/components/Screens/Home/ClubList'

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
        <ClubList />
      </main>
    </>
  )
}
