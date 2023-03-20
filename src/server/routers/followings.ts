import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export const FollowingsRouter = router({
  getFollowers: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ input }) => {
      const followers = await prisma.followings.findMany({
        where: {
          following: input.userId
        }
      })
      return followers
    }),
  getFollowings: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ input }) => {
      const followings = await prisma.followings.findMany({
        where: {
          userId: input.userId
        }
      })
      return followings
    }),
  isFollowing: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        following: z.string()
      })
    )
    .query(async ({ input }) => {
      const following = await prisma.followings.findFirst({
        where: {
          userId: input.userId,
          following: input.following
        }
      })
      return following
    }),
  createFollowing: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        following: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const following = await prisma.followings.create({
          data: {
            userId: input.userId,
            following: input.following
          }
        })
        return following
      } catch (error) {
        console.log(error)
      }
    }),
  deleteFollowing: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        following: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const deletedFollowing = await prisma.followings.deleteMany({
        where: {
          userId: input.userId,
          following: input.following
        }
      })

      return deletedFollowing
    })
})
