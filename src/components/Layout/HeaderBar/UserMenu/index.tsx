import { Fragment } from 'react'
import Spinner from '@/components/Layout/Spinner'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useSession, signIn } from 'next-auth/react'

const UserMenu = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const isUserLoading = status === 'loading'

  return (
    <>
      <Popover className="relative flex">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                  ${open ? 'shadow-md' : ''}
                  inline-flex p-[5px] bg-white items-center rounded-full justify-center hover:bg-gray-100 hover:shadow-md focus:outline-none relative`}
            >
              {isUserLoading ? (
                <Spinner />
              ) : session ? (
                <>
                  <Image
                    className="object-cover object-center rounded-full aspect-square"
                    src={session?.user?.image || ''}
                    alt="Avatar of the user"
                    width={30}
                    height={30}
                  />
                </>
              ) : (
                <UserCircleIcon className="w-10 h-10 text-gray-700" />
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 transform w-60 top-16 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid py-2 font-light bg-white">
                    {!session && (
                      <button
                        className="px-4 py-2 text-sm font-medium text-left text-slate-700 hover:bg-gray-100"
                        onClick={() =>
                          signIn('google', {
                            callbackUrl: `${window.location.pathname}/`
                          })
                        }
                      >
                        Iniciar Sesión
                      </button>
                    )}

                    {session && (
                      <>
                        <Link
                          href="/profile/[username]"
                          as={`/profile/${session?.user?.username}`}
                          className="px-4 py-2 text-sm font-normal text-left text-slate-700 hover:bg-gray-100"
                        >
                          Mi Perfil
                        </Link>
                      </>
                    )}

                    {session && (
                      <button
                        className="px-4 py-2 text-sm text-left text-slate-700 hover:bg-gray-100"
                        onClick={() =>
                          push({
                            pathname: '/auth/signout',
                            query: { callbackUrl: window.location.pathname }
                          })
                        }
                      >
                        Cerrar Sesión
                      </button>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default UserMenu
