import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getTimeAgo } from '@/utils/dateUtils'
import { trpc } from '@/utils/trpc'
import { Notification } from '@/types'

const NotificationsList = ({
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

export default NotificationsList
