import type { Review } from '@/lib/actions'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type createReviewParams = {
  formData: Review
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
  formData: Review
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
