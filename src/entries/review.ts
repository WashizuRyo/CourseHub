'use server'

import { OriginalReview } from '@/lib/definitions'
import { attachUserReviewStatus } from '@/lib/functions'
import {
  createReview as createReviewData,
  deleteReview as deleteReviewData,
  fetchLikedReviews,
  fetchLikedReviewsCount,
  fetchReviews,
  fetchReviewsCount,
  fetchUserReviews,
  updateReview as udpateReviewData,
} from '@/model/review'
import { ReviewFormState } from '@/type/review'
import { ReviewDataSchema } from '@/type/review/schema'
import { auth } from '@@/auth'

export async function loadUserReviews({ userId, page }: { userId: string; page: number }) {
  const [reviews, count] = await Promise.all([
    fetchUserReviews({ userId, page }),
    fetchReviewsCount({ field: 'createdBy', value: userId }),
  ])
  const reviewsWithUserMetadata = attachUserReviewStatus(reviews, userId)

  return { reviews: reviewsWithUserMetadata, count }
}

export async function loadLikedReviews({ userId, page }: { userId: string; page: number }) {
  const [reviews, count] = await Promise.all([
    fetchLikedReviews({ userId, currentPage: page }),
    fetchLikedReviewsCount({ userId }),
  ])
  const reviewsWithUserMetadata = attachUserReviewStatus(reviews, userId)

  return { reviews: reviewsWithUserMetadata, count }
}

export async function loadReviews({
  className,
  page,
  sort,
  faculty,
}: {
  className?: string
  page: number
  sort: 'asc' | 'desc'
  faculty?: string
}) {
  const field = className ? 'className' : faculty ? 'faculty' : null
  const value = className || faculty
  if (!field || !value) {
    throw new Error('Failed to fetch reviews')
  }

  const [reviews, count, session] = await Promise.all([
    fetchReviews({ page, sort, field, value }),
    fetchReviewsCount({ field, value }),
    auth(),
  ])

  if (!session?.user?.id) {
    throw new Error('Failed to fetch reviews')
  }

  const reviewsWithUserMetadata = attachUserReviewStatus(reviews, session.user.id)

  return { reviews: reviewsWithUserMetadata, count }
}

export async function createReview(
  universityId: number,
  prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  const validatedFields = ReviewDataSchema.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくありません。レビュー作成に失敗しました。',
    }
  }

  return await createReviewData({ formData: validatedFields.data, universityId, createdBy: session.user.id })
}

export async function updateReview(
  { universityId, id: reviewId, createdBy }: OriginalReview,
  prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  if (session.user.id !== createdBy) {
    throw new Error('このレビューを更新する権限がありません')
  }

  const validatedFields = ReviewDataSchema.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくないです。レビュー作成に失敗しました。',
    }
  }

  return await udpateReviewData({ formData: validatedFields.data, universityId, reviewId })
}

export async function deleteReview({ reviewId }: { reviewId: number }) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  await deleteReviewData({ reviewId, userId: session.user.id })
}
