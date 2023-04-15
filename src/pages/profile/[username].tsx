import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import prisma from '@/lib/prisma'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/Screens/Profile/Avatar'
import EditButton from '@/components/Screens/Profile/EditButton'
import FollowButton from '@/components/Screens/Profile/FollowButton'
import Spinner from '@/components/Layout/Spinner'
import FollowersModal from '@/components/Screens/Profile/FollowersModal'
import FollowingsModal from '@/components/Screens/Profile/FollowingsModal'
import { useRouter } from 'next/router'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Profile({
  user,
  followers,
  followings
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'

  const isOwner = session?.user?.email === user?.email

  const { isFallback } = useRouter()

  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      {isFallback ? (
        <Spinner />
      ) : (
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
                  <FollowButton userId={user.id} username={user.username} />
                )}
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-1 py-2">
                <h3 className="text-sm font-medium w-full text-center sm:text-left">
                  {user.name}
                </h3>
                <p className="text-sm w-full text-center sm:text-left">
                  {user.bio}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center w-full gap-4 text-sm font-medium sm:justify-start">
                <FollowersModal followers={followers} />
                <FollowingsModal followings={followings} />
                <div className="text-sm flex items-center font-medium gap-1 flex-col sm:flex-row ">
                  <span className="font-black">0</span>
                  <span className="font-light">Matches</span>
                </div>
              </div>
            </div>
          </header>

          <section className="flex flex-col items-center justify-center w-full px-16 py-8">
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 flex items-center justify-center">
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              New Match
            </button>
          </section>
        </main>
      )}
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

  const followers = await prisma.followings.findMany({
    where: { following: user?.id },
    include: { user: true }
  })

  const followings = await prisma.followings.findMany({
    where: { userId: user?.id },
    include: { followingUser: true }
  })

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      followers: JSON.parse(JSON.stringify(followers)),
      followings: JSON.parse(JSON.stringify(followings))
    }
  }
}

export async function getStaticPaths() {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => ({
    params: { username: user.username }
  }))

  return {
    paths,
    fallback: true
  }
}
