import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export const followNotificationsRouter = router({
  createNotification: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        message: z.string(),
        read: z.boolean(),
        creatorId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const notification = await prisma.followNotification.create({
          data: {
            userId: input.userId,
            message: input.message,
            read: input.read,
            creatorId: input.creatorId
          }
        })
        return notification
      } catch (error) {
        console.log(error)
      }
    }),
  markAsRead: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        notificationsId: z.array(z.string())
      })
    )
    .mutation(async ({ input }) => {
      try {
        const notifications = await prisma.followNotification.updateMany({
          where: {
            userId: input.userId,
            id: {
              in: input.notificationsId
            }
          },
          data: {
            read: true
          }
        })
        return notifications
      } catch (error) {
        console.log(error)
      }
    }),
  getNotifications: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ input }) => {
      try {
        const notifications = await prisma.followNotification.findMany({
          where: {
            userId: input.userId
          },
          include: {
            creator: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        return notifications
      } catch (error) {
        console.log(error)
      }
    })
})
