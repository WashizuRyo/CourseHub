import type { Review } from '@/app/lib/definitions';
import ReviewTemplate from '@/app/ui/universities/review-template';
import { auth } from '@@/auth';
import NotFound from './not-found';

export default async function Reviews({
  query,
  faculty,
  reviewsWithClass,
  id,
  totalPage,
}: {
  query: string;
  faculty: string;
  reviewsWithClass: Review[];
  id: string;
  totalPage: number;
}) {
  const session = await auth();

  const reviewsAddedIsLiked = reviewsWithClass.map((review) => {
    const isLiked =
      review.likes?.some((like) => like.userId === session?.user?.id) || false;

    // 新しいオブジェクトを返す
    return { ...review, isLiked };
  });

  return (
    <div>
      {reviewsAddedIsLiked.length === 0 ? (
        <NotFound query={query} faculty={faculty} />
      ) : (
        <ReviewTemplate
          session={session}
          id={id}
          totalPage={totalPage}
          reviews={reviewsAddedIsLiked}
        />
      )}
    </div>
  );
}
