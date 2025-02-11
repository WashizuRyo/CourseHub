import ReviewList from '@/components/review/ReviewList'
import ReviewsSkeleton from '@/components/skeletons/ReviewsSkeleton'
import { loadReviews } from '@/entries/review'
import type { searchParmas } from '@/lib/definitions'
import { getQueryParams } from '@/lib/functions'
import { Suspense } from 'react'
import NotFound from '../universities/not-found'

export default function Reviews({ searchParams }: { searchParams: searchParmas }) {
  if (Object.keys(searchParams).length === 0) {
    return
  }

  return (
    <Suspense key={searchParams.className + searchParams.faculty + searchParams.page} fallback={<ReviewsSkeleton />}>
      <div className='mt-6'>
        <ReviewsFetcher searchParams={searchParams} />
      </div>
    </Suspense>
  )
}

async function ReviewsFetcher({ searchParams }: { searchParams: searchParmas }) {
  const queryParams = getQueryParams(searchParams)
  const { reviews, count } = await loadReviews(searchParams)

  if (count === 0) {
    return <NotFound query={queryParams.className} faculty={queryParams.faculty} />
  }

  return <ReviewList hitCount={count} reviews={reviews} />
}
