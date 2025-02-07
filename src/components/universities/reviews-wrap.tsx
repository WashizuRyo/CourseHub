import ReviewTemplate from '@/components/universities/review-template'
import { fetchReviewsByClassNameOrFaculty } from '@/lib/data'
import type { searchParmas } from '@/lib/definitions'
import { getAddedIsLikedFieldToReviews, getQueryParams } from '@/lib/functions'
import { auth } from '@@/auth'
import NotFound from './not-found'

export default async function ReviewsWrap({ searchParams }: { searchParams: searchParmas }) {
  // QueryPrams(className, currentPage, sort, faculty)を取得
  const { className, currentPage, sort, faculty } = getQueryParams(searchParams)

  // 講義名または学部名で検索した時のレビューとセッションを取得
  const [reviewsByClassNameOrFaculty, session] = await Promise.all([
    fetchReviewsByClassNameOrFaculty(className, currentPage, sort, faculty),
    auth(),
  ])

  // レビューがない場合
  if (reviewsByClassNameOrFaculty.hitCount === 0) {
    return <NotFound query={className} faculty={faculty} />
  }

  // セッションのユーザがいいねしたかをフィールドに追加
  const reviewsAddedIsLiked = getAddedIsLikedFieldToReviews(reviewsByClassNameOrFaculty.data, session)

  return (
    <ReviewTemplate
      userId={session?.user?.id}
      hitCount={reviewsByClassNameOrFaculty.hitCount}
      reviews={reviewsAddedIsLiked}
    />
  )
}
