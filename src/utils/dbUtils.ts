import prisma from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import uploadFile from '@/services/uploadFile'

export const generateUniqueUsername = async (email: string) => {
  const firstEmailPart = email?.split('@')[0] || ''
  const username = firstEmailPart.replace(/\s+/g, '').toLowerCase()
  let suffix = ''
  let index = 1
  while (true) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username: `${username}${suffix}` },
        select: { id: true }
      })
      if (!existingUser) {
        break
      }
      suffix = `_${index}`
      index++
    } catch (error) {
      console.error(error)
      break
    }
  }
  return `${username}${suffix}`
}

export async function saveImage(userImage: string, userId: string) {
  const image = await fetch(userImage)
  const buffer = await (image as any).buffer()
  const filePath = `${userId}/${uuidv4()}`
  const bucket = 'avatars'
  const fileName = await uploadFile(buffer, filePath, bucket)

  return fileName
}
