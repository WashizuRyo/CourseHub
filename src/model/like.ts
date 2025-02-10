import { prisma } from '@/lib/prisma'

export async function postLike(reviewId: number, userId: string) {
  try {
    await prisma.likes.upsert({
      where: { reviewId_userId: { reviewId, userId } },
      update: {},
      create: { reviewId, userId },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch likes')
  }
}

export async function deleteLike(reviewId: number, userId: string) {
  try {
    await prisma.likes.delete({
      where: { reviewId_userId: { reviewId, userId } },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch likes')
  }
  return
}
