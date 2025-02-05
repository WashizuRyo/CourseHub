'use client';

import { useGetReviewsAndCountByUserId } from '@/app/lib/users';
import { useGetQueryParams } from '@/app/lib/users/functions';
import SearchReviewSkeleton from '@/components/skeletons/search-review-skeleton';
import ReviewTemplate from '@/components/universities/review-template';
import ReviewSlector from '@/components/universities/userpage/review-selector';

export default function Reviews({ params }: { params: { userId: string } }) {
  // ユーザIDを取得
  const userId = params.userId;

  // クエリパラメータ取得
  const { currentPage } = useGetQueryParams('page');

  // userIdを元にレビューを取得
  const { data, isError, error, isLoadingReviews } =
    useGetReviewsAndCountByUserId(userId, Number(currentPage));

  // エラーが発生した場合
  if (isError) {
    return (
      <div className="mt-3 text-center text-3xl font-bold">
        {error?.message}
      </div>
    );
  }

  // ローディング中
  if (isLoadingReviews) {
    return (
      <>
        <ReviewSlector />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );
  }

  // 一度もレビューを投稿していない場合
  if (!data) {
    return (
      <>
        <ReviewSlector />
        <div className="mt-3 text-center text-xl">
          投稿したレビューがありません
        </div>
      </>
    );
  }

  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        userId={userId}
        reviews={data.reviewsByUserId}
        hitCount={data.reviewCountByUserId}
      />
    </>
  );
}
