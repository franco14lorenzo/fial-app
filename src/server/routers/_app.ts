import { router } from '../trpc'
import { usersRouter } from './users'
import { followNotificationsRouter } from './notifications'
import { FollowingsRouter } from './followings'

export const appRouter = router({
  users: usersRouter,
  notifications: followNotificationsRouter,
  followings: FollowingsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
