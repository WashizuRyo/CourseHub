'use client'

import SearchReviewSkeleton from '@/components/skeletons/search-review-skeleton'
import ReviewTemplate from '@/components/universities/review-template'
import ReviewSlector from '@/components/universities/userpage/review-selector'
import { useGetLikedReviewsAndCountByUserId } from '@/lib/users'
import { useGetQueryParams } from '@/lib/users/functions'

export default function Likes({ params }: { params: { userId: string } }) {
  // ユーザIDを取得
  console.log('test----------------------------')

  const userId = params.userId
  // クエリパラメータのpageを取得
  const { currentPage } = useGetQueryParams('page')

  // ユーザがいいねしたレビューを取得
  const { data, error, isError, isPending } = useGetLikedReviewsAndCountByUserId(userId, Number(currentPage))

  // エラーが発生した場合
  if (isError) {
    return <div className='mt-3 text-center text-3xl font-bold'>{error?.message}</div>
  }

  // ローディング中
  if (isPending) {
    return (
      <>
        <ReviewSlector />
        <div className='mt-3'>
          <SearchReviewSkeleton />
        </div>
      </>
    )
  }

  // いいねしたレビューがなかった場合
  if (!data?.likedReviewCountByUserId)
    return (
      <>
        <ReviewSlector />
        <div className='m-4 text-center text-xl'>いいねをするといいねしたレビューが表示されます</div>
      </>
    )

  // いいねしたレビューを表示
  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        userId={userId}
        reviews={data.likedReviewByUserIdWithIsLikedTrue}
        hitCount={data.likedReviewCountByUserId}
      />
    </>
  )
}
