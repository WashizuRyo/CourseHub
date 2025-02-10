import { prisma } from '@/lib/prisma'
import { sequence } from '@@/e2e/factories/commom'

type Token = {
  name: string
  email: string
  image: string
  id: string
}

export const buildToken = (options = {}) => {
  const id = sequence('token')
  return {
    name: `Test User${id}`,
    email: `user${id}@example.com`,
    image: 'https://avatars.githubusercontent.com/u/000000',
    id: `dummy${id}`,
    ...options,
  }
}

export const createUser = async (data: Token) => {
  try {
    return await prisma.user.create({
      data: { ...data, createdAt: new Date(), updatedAt: new Date() },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to create user')
  }
}
