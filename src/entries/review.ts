import type { ReviewWithLike } from '@/lib/definitions'
import { fetchUserReviews, fetchUserReviewsCount } from '@/model/review'

export async function loadUserReviews({ userId, page }: { userId: string; page: number }) {
  const [reviews, count] = await Promise.all([fetchUserReviews({ userId, page }), fetchUserReviewsCount({ userId })])
  const reviewsWithisLiked: ReviewWithLike[] = reviews.map((review) => ({
    ...review,
    isLiked: review.likes !== undefined ? review.likes.some((like) => like.userId === userId) : false,
  }))

  return { reviews: reviewsWithisLiked, count }
}
