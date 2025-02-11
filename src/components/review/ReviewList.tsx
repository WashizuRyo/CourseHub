import Pagination from '@/components/Pagination'
import { Review } from '@/components/review/Review1'
import type { ReviewWithMetadata } from '@/lib/definitions'

export default function ReviewList({ reviews, hitCount }: { reviews: ReviewWithMetadata[]; hitCount: number }) {
  return (
    <div className='m-4 p-2 md:m-auto md:w-7/12'>
      <section>
        <h2 className='mb-4 text-2xl font-bold'>レビュー一覧</h2>
        <div className='rounded-md bg-gray-100 p-2'>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </section>
      <Pagination hitCount={hitCount} />
    </div>
  )
}
