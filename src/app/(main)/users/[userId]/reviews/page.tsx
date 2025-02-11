import ReviewList from '@/components/review/ReviewList'
import ReviewsSkeleton from '@/components/skeletons/ReviewsSkeleton'
import { loadUserReviews } from '@/entries/review'
import { auth } from '@@/auth'
import { Suspense } from 'react'

export default async function ReviewsPage({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: { page: string | undefined }
}) {
  const { userId } = params
  const page = searchParams.page ? Number(searchParams.page) : 1

  const session = await auth()
  const sessionUserId = session?.user?.id
  if (!sessionUserId) {
    return <div className='mt-3 text-center text-3xl font-bold'>ログインしてください</div>
  }
  if (sessionUserId !== userId) {
    return <div className='mt-3 text-center text-3xl font-bold'>権限がありません</div>
  }

  return (
    <Suspense key={page} fallback={<ReviewsSkeleton />}>
      <Reviews userId={userId} page={page} />
    </Suspense>
  )
}

async function Reviews({ userId, page }: { userId: string; page: number }) {
  const { reviews, count } = await loadUserReviews({ userId, page })

  if (count === 0) {
    return <div className='mt-3 text-center text-xl'>投稿したレビューがありません</div>
  }

  return <ReviewList reviews={reviews} hitCount={count} />
}
