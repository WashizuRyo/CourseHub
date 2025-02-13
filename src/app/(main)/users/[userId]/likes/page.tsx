import ReviewList from '@/components/review/ReviewList'
import ReviewsSkeleton from '@/components/skeletons/ReviewsSkeleton'
import { loadLikedReviews } from '@/entries/review'
import { auth } from '@@/auth'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'いいねしたレビュー',
}

export default async function LikedReviewsPage({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: { page: string | undefined }
}) {
  const { userId } = params
  const page = searchParams.page ? Number(searchParams.page) : 1

  return (
    <Suspense key={page} fallback={<ReviewsSkeleton />}>
      <Reviews userId={userId} page={page} />
    </Suspense>
  )
}

async function Reviews({ userId, page }: { userId: string; page: number }) {
  const session = await auth()
  const sessionUserId = session?.user?.id
  if (!sessionUserId) {
    return <div className='mt-3 text-center text-3xl font-bold'>ログインしてください</div>
  }
  if (sessionUserId !== userId) {
    return <div className='mt-3 text-center text-3xl font-bold'>権限がありません</div>
  }

  const { reviews, count } = await loadLikedReviews({ userId, page })

  if (count === 0) {
    return <div className='m-4 text-center text-xl'>いいねをするとレビューが表示されます</div>
  }

  return <ReviewList reviews={reviews} hitCount={count} />
}
