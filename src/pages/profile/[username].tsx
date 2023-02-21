import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import prisma from '@/lib/prisma'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Profile({
  user
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session } = useSession()

  const isOwner = session?.user?.email === user.email
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (isOwner) {
      console.log('Edit profile')
    } else {
      console.log('Follow')
    }
  }

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
          <button
            className="mx-auto mb-6 sm:mb-0"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={user.avatar || user.image}
              alt="Picture of the author"
              width={150}
              height={150}
              className="rounded-full"
            />
          </button>
          <div className="flex flex-col items-center justify-start flex-1 w-full gap-2 sm:items-start sm:pl-16">
            <div className="flex flex-row items-center justify-center flex-1 w-full gap-8 sm:justify-start">
              <h2 className="text-xl font-medium">@{user.username}</h2>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
                onClick={handleClick}
              >
                {isOwner ? 'Editar' : 'Seguir'}
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{user.name}</h3>
          </div>
        </header>
      </main>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 dark:bg-gray-darkMode/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center justify-between w-full h-auto max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-black-darkMode">
                  <Dialog.Title
                    as="h3"
                    className="w-full p-8 text-lg font-medium leading-6 text-center text-gray-700 border-b dark:text-white-darkMode"
                  >
                    Cambiar foto de perfil
                  </Dialog.Title>

                  <div className="flex flex-col w-full">
                    <button className="w-full p-4 text-sm font-bold border-b text-emerald-500 hover:text-emerald-400">
                      Subir foto
                    </button>
                    <button className="w-full p-4 text-sm font-bold text-red-500 border-b hover:text-red-400">
                      Eliminar foto
                    </button>
                    <button
                      type="button"
                      className="w-full p-4 text-sm font-bold text-gray-700 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
    props: { user: JSON.parse(JSON.stringify(user)) },
    revalidate: 10
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
