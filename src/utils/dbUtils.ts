import prisma from '@/lib/prisma'

export const generateUniqueUsername = async (name: string): Promise<string> => {
  const username = name.replace(/\s+/g, '').toLowerCase()
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
