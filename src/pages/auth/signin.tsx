import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import MainForm from '@/components/Screens/SignIn/MainForm'

export default function SignIn({
  providers,
  redirectUrl
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar showUserMenu={false} />

      <main className="w-full h-full mx-auto max-w-7xl pt-[63px] min-h-screen flex flex-col items-center justify-center gap-4 text-sm">
        <MainForm providers={providers} redirectUrl={redirectUrl} />
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  const { redirectUrl } = context.query

  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ? Object.values(providers) : [],
      redirectUrl
    }
  }
}
