import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { getTimeAgo } from '@/utils/dateUtils'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '@/utils/trpc'
import { Notification } from '@/types'

const NotificationsMenu = () => {
  const [refresh, setRefresh] = useState(false)
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0)
  const { data: session } = useSession()

  const {
    data: notifications,
    isLoading,
    refetch
  } = trpc.notifications.getNotifications.useQuery({
    userId: session?.user?.id as string
  })

  useEffect(() => {
    const count = notifications?.filter((n) => !n.read)?.length || 0
    setUnreadNotificationsCount(count)
  }, [notifications])

  useEffect(() => {
    refetch()
  }, [refresh, refetch])

  const isUserHasNotifications = unreadNotificationsCount > 0
  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                  ${open ? 'shadow-md' : ''}
                  inline-flex bg-white items-center rounded-full hover:shadow-md focus:outline-none relative`}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-700 hover:bg-gray-100">
                <BellIcon className="w-6 h-6" />
                {isUserHasNotifications && !isLoading && !open && (
                  <span className="absolute inline-flex items-center justify-center w-4 h-4 p-2 px-1 text-xs text-center text-white bg-red-500 rounded-full top-1 right-1 animate-bounce">
                    <span className="leading-4 text-center">
                      {unreadNotificationsCount}
                    </span>
                  </span>
                )}
              </div>
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute z-10 transform -right-12 w-72 top-16 "
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid py-2 font-light bg-white">
                    <>
                      <button className="px-4 py-2 mb-2 text-sm font-medium text-left border-b text-slate-700">
                        Notificaciones
                      </button>
                      <ul className="text-sm font-normal text-left text-slate-700">
                        {!notifications && (
                          <li className="px-4 py-2 text-center text-gray-400">
                            No hay notificaciones
                          </li>
                        )}
                        {notifications && (
                          <AllNotifications
                            notifications={notifications as Notification[]}
                            setRefresh={setRefresh}
                          />
                        )}
                      </ul>
                    </>
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

export default NotificationsMenu

const AllNotifications = ({
  notifications,
  setRefresh
}: {
  notifications: Notification[]
  setRefresh?: any
}) => {
  const { data: session } = useSession()
  const { mutate: markAsRead, isSuccess } =
    trpc.notifications.markAsRead.useMutation()

  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    setIsRead(true)
  }, [])

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications
        .filter((n) => !n.read)
        .map((n) => n.id)

      if (unreadNotifications.length > 0) {
        markAsRead({
          userId: session?.user?.id as string,
          notificationsId: unreadNotifications
        })
      }
    }
  }, [notifications, markAsRead, session?.user?.id])

  useEffect(() => {
    if (isSuccess) {
      setRefresh((prev: boolean) => !prev)
    }
  }, [isSuccess, setRefresh])
  return (
    <>
      {notifications?.map((notification) => (
        <li
          key={notification.id}
          className={`px-4 py-2 transition-colors duration-[5000ms]
           ${
             !notification.read && !isRead
               ? 'bg-emerald-50 hover:bg-emerald-100'
               : 'hover:bg-gray-100'
           } `}
        >
          <div className="flex items-center justify-between gap-2 text-xs">
            <Link
              href={`/profile/${notification.creator.username}`}
              className="hover:cursor-pointer"
            >
              <Image
                src={notification.creator.image || ''}
                alt={notification.creator.username || ''}
                width={32}
                height={32}
                className="object-cover w-8 h-8 mr-2 rounded-full"
                draggable="false"
              />
            </Link>
            <span className="flex-1 font-medium">
              <Link
                href={`/profile/${notification.creator.username}`}
                className="text-emerald-500 hover:underline"
              >
                @{notification.creator.username}{' '}
              </Link>
              {notification.message} ·{' '}
              <span className="text-xs text-gray-400">
                {getTimeAgo(notification.createdAt)}
              </span>
            </span>
          </div>
        </li>
      ))}
    </>
  )
}
