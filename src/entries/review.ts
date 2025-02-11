import { attachUserReviewStatus } from '@/lib/functions'
import {
  fetchLikedReviews,
  fetchLikedReviewsCount,
  fetchReviews,
  fetchReviewsCount,
  fetchUserReviews,
  fetchUserReviewsCount,
} from '@/model/review'
import { auth } from '@@/auth'

export async function loadUserReviews({ userId, page }: { userId: string; page: number }) {
  const [reviews, count] = await Promise.all([fetchUserReviews({ userId, page }), fetchUserReviewsCount({ userId })])
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
