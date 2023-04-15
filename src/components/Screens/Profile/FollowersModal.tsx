import { Fragment, useState, useEffect } from 'react'
import FollowButton from '@/components/Screens/Profile/FollowButton'
import Image from 'next/image'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import type { User } from 'src/types'
import { useRouter } from 'next/router'

const FollowersModal = ({
  followers
}: {
  followers: { id: string; user: User }[]
}) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const { asPath } = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [asPath])

  return (
    <>
      <button
        className="text-sm flex items-center font-medium gap-1 flex-col sm:flex-row hover:text-emerald-500"
        onClick={() => setIsOpen(true)}
      >
        <span className="font-black">{followers?.length}</span>
        <span className="font-light">Seguidores</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
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
            <div className="flex items-center justify-center min-h-full text-left">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center justify-between w-full h-full max-w-lg p-4 m-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-black-darkMode">
                  <Dialog.Title className="flex items-center justify-between w-full p-2 border-b">
                    <span className="text-xl font-medium leading-6 text-gray-900 dark:text-white-darkMode">
                      Seguidores
                    </span>
                    <button
                      type="button"
                      className="p-1 rounded-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="text-gray-500 w-7 h-7" />
                    </button>
                  </Dialog.Title>
                  <div className="flex flex-col items-center justify-center w-full h-full py-2 overflow-y-auto">
                    {followers.map((follower) => (
                      <Link
                        key={follower.id}
                        className="flex items-center justify-between w-full p-2 my-2 border-b cursor-pointer hover:bg-gray-100"
                        href={`/profile/${follower.user.username}`}
                      >
                        <div className="flex items-center justify-start w-full gap-2">
                          <Image
                            src={follower.user.image}
                            alt={follower.user.name}
                            width={40}
                            height={40}
                            className=" rounded-full"
                          />
                          <div className="flex flex-col items-start justify-center flex-1">
                            <span className="text-xs font-medium">
                              @{follower.user.username}
                            </span>
                            <span className="text-xs text-gray-500">
                              {follower.user.name}
                            </span>
                          </div>
                        </div>
                        <div>
                          {follower.user.id !== session?.user.id && (
                            <FollowButton
                              userId={follower.user.id}
                              username={follower.user.username}
                            />
                          )}
                        </div>
                      </Link>
                    ))}
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

export default FollowersModal
