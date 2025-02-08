import type { ReviewData } from '@/lib/actions'
import { PAGE_SIZE } from '@/lib/constants'
import type { Review, ReviewWithLike } from '@/lib/definitions'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type createReviewParams = {
  formData: ReviewData
  universityId: number
  createdBy: string
}

export async function createReview({ formData, universityId, createdBy }: createReviewParams) {
  const { who, ...restFormData } = formData

  try {
    await prisma.reviews.create({
      data: {
        ...restFormData,
        universityId,
        createdBy,
        date: new Date().toISOString().split('T')[0],
        isAnonymous: who === 'anonymous',
      },
    })
  } catch (error) {
    console.error(error)
    return {
      errors: null,
      message: 'Database Error: Failed to Create Review',
    }
  }

  revalidatePath(`/universities/${universityId}`)
  redirect(`/universities/${universityId}`)
}

export default async function fetchReview(evaluationId: number) {
  try {
    const data = await prisma.reviews.findUnique({
      where: { id: evaluationId },
    })
    return data
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch review')
  }
}

export async function updateReview({
  formData,
  universityId,
  reviewId,
}: {
  formData: ReviewData
  universityId: number
  reviewId: number
}) {
  const { who, ...restFormData } = formData

  try {
    await prisma.reviews.update({
      where: { id: reviewId },
      data: { ...restFormData, isAnonymous: who === 'anonymous' },
    })
  } catch (error) {
    console.error(error)
    return {
      errors: null,
      message: 'Database Error: Failed to Update Review',
    }
  }

  revalidatePath(`/universities/${universityId}`)
  redirect(`/universities/${universityId}`)
}

export async function fetchLikedReviews({
  userId,
  currentPage = 1,
}: {
  userId: string
  currentPage: number
}): Promise<ReviewWithLike[]> {
  const reviews = await prisma.reviews.findMany({
    where: {
      likes: {
        some: {
          userId,
        },
      },
    },
    include: { user: true },
    skip: PAGE_SIZE * (currentPage - 1),
    take: PAGE_SIZE,
  })

  return reviews.map((review) => ({ ...review, isLiked: true }))
}

export async function fetchLikedReviewsCount({ userId }: { userId: string }) {
  return await prisma.reviews.count({
    where: {
      likes: {
        some: {
          userId,
        },
      },
    },
  })
}

export async function fetchUserReviews({ userId, page = 1 }: { userId: string; page: number }): Promise<Review[]> {
  const reviews = await prisma.reviews.findMany({
    where: { createdBy: userId },
    include: { user: true, likes: true },
    skip: PAGE_SIZE * (page - 1),
    take: PAGE_SIZE,
  })
  return reviews
}

export async function fetchUserReviewsCount({ userId }: { userId: string }) {
  return await prisma.reviews.count({
    where: { createdBy: userId },
  })
}
