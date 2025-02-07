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
