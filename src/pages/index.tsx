import Head from 'next/head'
import { trpc } from '../utils/trpc'

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'Fialllllll' })

  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid w-screen h-screen place-content-center">
        <h1 className="mx-2 my-4 font-bold text-center text-red-500">
          Fial App{' '}
          <span>{hello.data ? hello.data.greeting : 'loading...'}</span>
        </h1>
      </main>
    </>
  )
}
