import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import AddClubForm from '@/components/Screens/AddClub/AddClubForm'
import prisma from '@/lib/prisma'

export default function AddClubPage({ userId }: { userId: string }) {
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
        <div className="flex flex-col items-start justify-start w-full gap-4 py-5 md:w-1/2">
          <h1 className="w-full mt-5 text-3xl font-bold md:text-5xl text-slate-700 md:mt-0">
            Suma tu Club.
          </h1>
          <h2 className="w-full text-3xl font-bold text-indigo-600 md:text-5xl">
            Completa el formulario para agregar tu club.
          </h2>
          <AddClubForm userId={userId} />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string }
    })

    return { props: { userId: user?.id } }
  }

  if (!session) {
    // redirect to signin page and send a redirect url
    return {
      redirect: {
        destination: `/auth/signin?redirectUrl=${context.resolvedUrl}`,
        permanent: false
      }
    }
  }
}
