import ReviewHeader from '@/components/review/ReviewHeader'
import ReviewSearch from '@/components/review/ReviewSearch'
import Reviews from '@/components/review/ReviewsPage'
import Spinner from '@/components/utils/Spinner'
import { fetchUniversity } from '@/model/university'
import { searchParmas } from '@/type/common'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'レビュー検索',
}

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: searchParmas
}) {
  return (
    <Suspense fallback={<Spinner />}>
      <ReviewSearchPage universityId={params.id} searchParams={searchParams} />
    </Suspense>
  )
}

async function ReviewSearchPage({ universityId, searchParams }: { universityId: string; searchParams: searchParmas }) {
  const university = await fetchUniversity(Number(universityId))

  if (!university) {
    notFound()
  }

  return (
    <main>
      <div className='flex flex-col'>
        <ReviewHeader universityId={universityId} />
        <ReviewSearch />
      </div>

      <Reviews searchParams={searchParams} />
    </main>
  )
}
