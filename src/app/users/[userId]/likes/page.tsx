'use client';

import { useGetLikedReviewsAndCountByUserId } from '@/app/lib/users';
import { getTotalPage, useGetQueryParams } from '@/app/lib/users/functions';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import ReviewSlector from '@/app/ui/universities/userpage/review-selector';

export default function Likes({ params }: { params: { userId: string } }) {
  // ユーザIDを取得
  const userId = params.userId;
  // クエリパラメータのpageを取得
  const { currentPage } = useGetQueryParams('page');

  // ユーザがいいねしたレビューを取得
  const { data, error, isError, isLoadingLikedReviews } =
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
  if (isLoadingLikedReviews) {
    return (
      <>
        <ReviewSlector />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );
  }

  // いいねしたレビューの数
  const likedReviewsCount = data.likedReviewCountByUserId;

  // いいねしたレビューがなかった場合
  if (likedReviewsCount === 0)
    return (
      <>
        <ReviewSlector />
        <div className="m-4 text-center text-xl">
          いいねをするといいねしたレビューが表示されます
        </div>
      </>
    );

  //　pageSizeで割り切れる場合と割り切れない場合でページ数を変更
  const totalPage = getTotalPage(likedReviewsCount);

  // いいねしたレビューを表示
  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        userId={userId}
        reviews={data.likedReviewByUserIdWithIsLikedTrue}
        totalPage={totalPage}
      />
    </>
  );
}