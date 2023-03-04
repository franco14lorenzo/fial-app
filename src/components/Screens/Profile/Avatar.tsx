import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { User } from '@/types/index.d'

const Avatar = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="mx-auto mb-6 sm:mb-0" onClick={() => setIsOpen(true)}>
        <Image
          src={`${user.image}`}
          alt="Picture of the author"
          width={150}
          height={150}
          className="object-cover object-center rounded-full aspect-square"
          priority
        />
      </button>

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
            <div className="fixed inset-0 cursor-pointer backdrop-blur-md bg-black/50 dark:bg-gray-darkMode/75" />
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
                <Dialog.Panel className="flex flex-col items-center justify-between h-auto max-w-md overflow-hidden text-left align-middle transition-all transform bg-transparent bg-whites dark:bg-black-darkMode">
                  <div className="relative rounded-full ">
                    <Image
                      src={user.image}
                      alt="Avatar of the user"
                      width={300}
                      height={300}
                      className="object-cover object-center rounded-3xl aspect-square"
                    />
                    <button
                      type="button"
                      className="absolute z-10 p-1 rounded-full top-2 right-2 bg-black/50 hover:bg-black/75"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6 text-white" />
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

export default Avatar
