import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { usersRouter } from './users'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`
      }
    }),
  users: usersRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
