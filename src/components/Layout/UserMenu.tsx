import { Fragment } from 'react'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const UserMenu = () => {
  const { data: session } = useSession()
  const { push } = useRouter()

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                  ${open ? 'shadow-md' : ''}
                  inline-flex bg-white items-center rounded-full p-1 border hover:shadow-md focus:outline-none`}
            >
              <Bars3Icon className="w-6 h-6 ml-1 mr-3 text-slate-700" />
              {session ? (
                <Image
                  className="rounded-full"
                  src={session?.user?.image || ''}
                  alt="Picture of the author"
                  width={30}
                  height={30}
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-slate-700" />
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
                      <Link
                        href="/profile/[username]"
                        as={`/profile/${session?.user?.username}`}
                        className="px-4 py-2 text-sm font-normal text-left text-slate-700 hover:bg-gray-100"
                      >
                        Mi Perfil
                      </Link>
                    )}

                    <Link
                      href="/add-club"
                      className="px-4 py-2 text-sm font-normal text-left text-slate-700 hover:bg-gray-100"
                    >
                      ¿Tenes un Club?
                    </Link>

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
