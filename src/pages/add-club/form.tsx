import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import AddClubForm from '@/components/Screens/AddClub/AddClubForm'

export default function AddClubPage() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />

      <main className="w-full h-full mx-auto max-w-7xl pt-[63px] min-h-screen flex flex-col md:flex-row items-center justify-start gap-10 text-sm px-6">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-start gap-4 py-5">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-700 w-full mt-5 md:mt-0">
            Suma tu Club.
          </h1>
          <h2 className=" text-emerald-600 font-bold text-3xl md:text-5xl w-full">
            Completa el formulario para agregar tu club.
          </h2>
          <AddClubForm />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: '/auth/signin' } }
  }
  return { props: {} }
}
