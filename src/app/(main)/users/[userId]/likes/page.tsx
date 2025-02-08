import ReviewTemplate from '@/components/universities/review-template'
import { fetchLikedReview, fetchLikedReviewCount } from '@/model/review'
import { auth } from '@@/auth'

export default async function LikedReviews({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: { page: string }
}) {
  const { userId } = params

  const session = await auth()
  const sessionUserId = session?.user?.id
  if (!sessionUserId) {
    return <div className='mt-3 text-center text-3xl font-bold'>ログインしてください</div>
  }
  if (sessionUserId !== userId) {
    return <div className='mt-3 text-center text-3xl font-bold'>権限がありません</div>
  }

  const [reviews, count] = await Promise.all([
    fetchLikedReview({ userId, currentPage: Number(searchParams.page) }),
    fetchLikedReviewCount({ userId }),
  ])

  if (count === 0) {
    return <div className='m-4 text-center text-xl'>いいねをするとレビューが表示されます</div>
  }

  return <ReviewTemplate userId={userId} reviews={reviews} hitCount={count} />
}
