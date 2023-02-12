import type { GetServerSidePropsContext } from 'next'
import { signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import { useRouter } from 'next/router'

export default function SignIn() {
  const { query, push } = useRouter()

  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />

      <main className="w-full h-full mx-auto max-w-7xl pt-[63px] min-h-screen flex flex-col items-center justify-center gap-4 text-sm">
        <div className="flex flex-col items-center justify-center gap-4 px-24 py-32 bg-white border rounded-lg">
          <h1> ¿Estas seguro que quieres cerrar session?</h1>
          <h2 className="mb-12 text-base font-bold text-center">
            Te esperamos de vuelta
          </h2>

          <button
            className="flex items-center justify-center h-12 mx-auto space-x-2 text-center bg-white border border-gray-300 rounded-md w-72 hover:bg-gray-100"
            onClick={() => signOut()}
          >
            <span>Cerrar Session</span>
          </button>
          <button
            className="flex items-center justify-center h-12 mx-auto space-x-2 text-center text-white border border-gray-300 rounded-md hover:bg-emerald-600 bg-emerald-500 w-72"
            onClick={() =>
              push(query?.callbackUrl ? query?.callbackUrl.toString() : '/')
            }
          >
            <span>Cancelar</span>
          </button>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: '/' } }
  }

  return {
    props: {}
  }
}
