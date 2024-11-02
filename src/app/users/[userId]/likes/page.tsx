'use client';

import { useGetLikedReviewsAndCountByUserId } from '@/app/lib/users';
import { useGetQueryParams } from '@/app/lib/users/functions';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import ReviewSlector from '@/app/ui/universities/userpage/review-selector';

export default function Likes({ params }: { params: { userId: string } }) {
  // ユーザIDを取得
  const userId = params.userId;
  // クエリパラメータのpageを取得
  const { currentPage } = useGetQueryParams('page');

  // ユーザがいいねしたレビューを取得
  const { data, error, isError, isPending } =
    useGetLikedReviewsAndCountByUserId(userId, Number(currentPage));

  // エラーが発生した場合
  if (isError) {
    return (
      <div className="mt-3 text-center text-3xl font-bold">
        {error?.message}
      </div>
    );
  }

  // ローディング中
  if (isPending) {
    return (
      <>
        <ReviewSlector />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );
  }

  // いいねしたレビューがなかった場合
  if (!data?.likedReviewCountByUserId)
    return (
      <>
        <ReviewSlector />
        <div className="mt-12 text-center text-xl">
          いいねをするとレビューが表示されます
        </div>
      </>
    );

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
  );
}
