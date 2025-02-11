import { DEFAULT_SORT, PAGE_SIZE } from '@/lib/constants'
import type { Review, ReviewWithMetadata, searchParmas } from '@/lib/definitions'

export function getTotalPage(pageCount: number) {
  if (pageCount <= 0) return 0
  //　PAZE_SIZEで割り切れる場合と割り切れない場合でページ数を変更
  return pageCount % PAGE_SIZE === 0 ? pageCount / PAGE_SIZE : Math.floor(pageCount / PAGE_SIZE) + 1
}

export function getQueryParams(searchParams: searchParmas) {
  const className = searchParams.className
  const currentPage = Number(searchParams.page)
  const sort = searchParams.sort || DEFAULT_SORT
  const faculty = searchParams.faculty

  return { className, currentPage, sort, faculty }
}

export function attachUserReviewStatus(reviews: Review[], userId: string): ReviewWithMetadata[] {
  return reviews.map((review) => ({
    ...review,
    isLiked: review.likes?.some((like) => like.userId === userId) || false,
    isAuthor: review.createdBy === userId,
  }))
}
