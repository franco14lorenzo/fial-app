import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import prisma from '@/lib/prisma'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/Screens/Profile/Avatar'
import EditButton from '@/components/Screens/Profile/EditButton'
import FollowButton from '@/components/Screens/Profile/FollowButton'
import Spinner from '@/components/Layout/Spinner'

export default function Profile({
  user
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'

  const isOwner = session?.user?.email === user.email

  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      <main className="w-full h-full mx-auto max-w-5xl pt-[63px]">
        <header className="flex flex-col items-start w-full px-16 py-8 sm:flex-row">
          <Avatar user={user} />
          <div className="flex flex-col items-center justify-start flex-1 w-full gap-2 sm:items-start sm:pl-16">
            <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 sm:gap-8 sm:flex-row sm:justify-start">
              <h2 className="text-lg font-medium sm:text-xl">
                @{user.username}
              </h2>

              {isLoading ? (
                <Spinner />
              ) : isOwner ? (
                <EditButton />
              ) : (
                <FollowButton />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-500">{user.name}</h3>
          </div>
        </header>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params?.username as string
    }
  })

  if (!user) {
    return {
      notFound: true
    }
  }
  return {
    props: { user: JSON.parse(JSON.stringify(user)) }
  }
}

export async function getStaticPaths() {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => ({
    params: { username: user.username }
  }))

  return {
    paths,
    fallback: false
  }
}
