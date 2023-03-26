import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { useEffect } from 'react'

const FollowButton = ({
  userId,
  username
}: {
  userId: string
  username: string
}) => {
  const { data: session } = useSession()

  const { data: isFollowing, isLoading: isFollowingLoading } =
    trpc.followings.isFollowing.useQuery({
      userId: session?.user?.id as string,
      following: userId
    })

  const { mutate: follow, isSuccess } =
    trpc.followings.createFollowing.useMutation()

  const { mutate: unfollow, isSuccess: isUnfollowSuccess } =
    trpc.followings.deleteFollowing.useMutation()
  const { mutate } = trpc.notifications.createNotification.useMutation()

  useEffect(() => {
    if (isSuccess) {
      mutate({
        userId,
        message: `te ha seguido`,
        read: false,
        creatorId: session?.user?.id as string
      })
      fetch(
        `/api/revalidate?secret=KN3p=JQ1p4ijZFuWK92w0vepaPkWb92aJ0n816um=ho=&path=/profile/${username}`
      ).then(() => {
        window.location.replace(`/profile/${username}`)
      })
    }

    if (isUnfollowSuccess) {
      mutate({
        userId,
        message: `te ha dejado de seguir`,
        read: false,
        creatorId: session?.user?.id as string
      })
      fetch(
        `/api/revalidate?secret=KN3p=JQ1p4ijZFuWK92w0vepaPkWb92aJ0n816um=ho=&path=/profile/${username}`
      ).then(() => {
        window.location.replace(`/profile/${username}`)
      })
    }
  }, [
    isSuccess,
    mutate,
    userId,
    session?.user?.id,
    isUnfollowSuccess,
    username
  ])

  const handleClick = () => {
    isFollowing
      ? unfollow({
          userId: session?.user?.id as string,
          following: userId
        })
      : follow({
          userId: session?.user?.id as string,
          following: userId
        })
  }
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white rounded-full bg-emerald-500 hover:bg-emerald-600"
      onClick={handleClick}
    >
      {isFollowingLoading
        ? 'Cargando...'
        : isFollowing
        ? 'Dejar de seguir'
        : 'Seguir'}
    </button>
  )
}

export default FollowButton
