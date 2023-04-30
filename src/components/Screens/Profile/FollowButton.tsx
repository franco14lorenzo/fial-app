import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'

const FOLLOW_BUTTON_STATES = {
  FOLLOW: 'Seguir',
  UNFOLLOW: 'Siguiendo',
  LOADING: 'Cargando...'
}

const FollowButton = ({
  userId,
  username,
  setFollowersCount
}: {
  userId: string
  username: string
  setFollowersCount: Dispatch<SetStateAction<number>>
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

  const [buttonLabel, setButtonLabel] = useState(FOLLOW_BUTTON_STATES.LOADING)

  useEffect(() => {
    if (isFollowingLoading) {
      setButtonLabel(FOLLOW_BUTTON_STATES.LOADING)
    }
    if (isFollowing) {
      setButtonLabel(FOLLOW_BUTTON_STATES.UNFOLLOW)
    }
    if (!isFollowing) {
      setButtonLabel(FOLLOW_BUTTON_STATES.FOLLOW)
    }
  }, [isFollowing, isFollowingLoading])

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
      )
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
      )
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
    if (isFollowing) {
      setButtonLabel(FOLLOW_BUTTON_STATES.FOLLOW)
      setFollowersCount((prev) => prev - 1)
      unfollow({
        userId: session?.user?.id as string,
        following: userId
      })
    }
    if (!isFollowing) {
      setButtonLabel(FOLLOW_BUTTON_STATES.UNFOLLOW)
      setFollowersCount((prev) => prev + 1)
      follow({
        userId: session?.user?.id as string,
        following: userId
      })
    }
  }
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white rounded-full bg-indigo-500 hover:bg-indigo-600"
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  )
}

export default FollowButton
