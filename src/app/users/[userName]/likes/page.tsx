'use client';

import { getLikedReviewsAndCountByUserId } from '@/app/lib/api/users/get-liked-reviews-and-count-by-user-id';
import { PAGE_SIZE } from '@/app/lib/constants';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import ReviewSlector from '@/app/ui/universities/userpage/review-selector';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Likes() {
  // セッションを取得
  const session = useSession();
  const userId = session?.data?.user?.id || '';

  // クエリパラメータのpageを取得
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  // ユーザがいいねしたレビューを取得
  const {
    data,
    error,
    isError,
    isLoading: isLoadingLikedReviews,
  } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () => getLikedReviewsAndCountByUserId(userId, Number(currentPage)),
  });

  // エラーが発生した場合
  if (isError) {
    return (
      <div className="mt-3 text-center text-3xl font-bold">{error.message}</div>
    );
  }

  // ローディング中
  if (isLoadingLikedReviews)
    return (
      <>
        <ReviewSlector />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );

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
  const totalPage =
    likedReviewsCount % PAGE_SIZE === 0
      ? likedReviewsCount / PAGE_SIZE
      : Math.floor(likedReviewsCount / PAGE_SIZE) + 1;

  // いいねしたレビューを表示
  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        session={session.data}
        reviews={data.likedReviewByUserIdWithIsLikedTrue}
        totalPage={totalPage}
      />
    </>
  );
}
