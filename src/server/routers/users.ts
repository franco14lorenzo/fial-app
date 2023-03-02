import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export const usersRouter = router({
  updateImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: { id: input.id },
        data: { image: input.image }
      })
      return user
    }),
  updateInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: { id: input.id },
        data: { name: input.name, username: input.username }
      })
      return user
    })
})
