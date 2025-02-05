import type { ReviewWithLike } from '@/app/lib/definitions';
import Pagenation from '@/components/pagenation';
import { Review } from '@/components/review/review';

export default function ReviewTemplate({
  userId,
  reviews,
  hitCount,
}: {
  userId: string | undefined;
  reviews: ReviewWithLike[];
  hitCount: number;
}) {
  return (
    <div className="m-4 p-2 md:m-auto md:w-7/12">
      <section className="rounded-md bg-gray-100 p-2">
        {reviews.map((review: ReviewWithLike) => (
          <Review key={review.id} review={review} userId={userId} />
        ))}
      </section>
      <section className="mt-6 text-center">
        <Pagenation hitCount={hitCount} />
      </section>
    </div>
  );
}
