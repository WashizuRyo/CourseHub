import type { Review } from '@/app/lib/definitions';
import { getAddedIsLikedFieldToReviews } from '@/app/lib/functions';
import ReviewTemplate from '@/app/ui/universities/review-template';
import { auth } from '@@/auth';
import NotFound from './not-found';

export default async function ReviewsWrap({
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
  // セッションを取得
  const session = await auth();

  // セッションのユーザがいいねしたかをフィールドに追加
  const reviewsAddedIsLiked = getAddedIsLikedFieldToReviews(
    reviewsWithClass,
    session,
  );

  return (
    <div>
      {reviewsAddedIsLiked.length === 0 ? (
        <NotFound query={query} faculty={faculty} />
      ) : (
        <ReviewTemplate
          userId={session?.user?.id}
          id={id}
          totalPage={totalPage}
          reviews={reviewsAddedIsLiked}
        />
      )}
    </div>
  );
}
