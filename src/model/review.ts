import { PAGE_SIZE } from '@/lib/constants'
import type { Review, ReviewWithIsLiked } from '@/lib/definitions'
import { prisma } from '@/lib/prisma'
import { ReviewData } from '@/type/review'
import type { Reviews } from '@prisma/client'
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
}): Promise<ReviewWithIsLiked[]> {
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

export async function fetchReviewsByUniversityId(universityId: number) {
  try {
    const data = await prisma.reviews.findMany({
      where: { universityId },
    })
    return data
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch reviews')
  }
}

export async function fetchReviews({
  page,
  sort,
  field,
  value,
}: {
  page: number
  sort: 'asc' | 'desc'
  field: keyof Reviews
  value: string
}) {
  try {
    return await prisma.reviews.findMany({
      skip: PAGE_SIZE * (page - 1),
      take: PAGE_SIZE,
      where: { [field]: value },
      orderBy: { date: sort },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            likes: true,
          },
        },
        likes: true,
      },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch reviews')
  }
}

export async function fetchReviewsCount({ field, value }: { field: keyof Reviews; value: string }) {
  try {
    return await prisma.reviews.count({
      where: { [field]: value },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch review count')
  }
}

export async function deleteReview({ reviewId, userId }: { reviewId: number; userId: string }) {
  try {
    await prisma.reviews.delete({
      where: { id: reviewId },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Database Error: Failed to Delete Review')
  }

  revalidatePath(`/users/${userId}/reviews`)
  redirect(`/users/${userId}/reviews`)
}
