'use client';

import { getTotalPage } from '@/app/lib/functions';
import { useGetReviewsAndCountByUserId } from '@/app/lib/users';
import { useGetQueryParams } from '@/app/lib/users/functions';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import ReviewSlector from '@/app/ui/universities/userpage/review-selector';

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

  // 投稿したレビューの数
  const reviewCount = data.reviewCountByUserId;

  // 一度もレビューを投稿していない場合
  if (reviewCount === 0) {
    return (
      <>
        <ReviewSlector />
        <div className="mt-3 text-center text-xl">
          投稿したレビューがありません
        </div>
      </>
    );
  }

  //　総ページ数を取得
  const totalPage = getTotalPage(reviewCount);

  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        userId={userId}
        reviews={data.reviewsByUserId}
        totalPage={totalPage}
      />
    </>
  );
}
