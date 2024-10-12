'use client';

import { getReviewsAndCountByUserId } from '@/app/lib/api/users/get-review-and-count-by-user-id';
import { PAGE_SIZE } from '@/app/lib/constants';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import ReviewSlector from '@/app/ui/universities/userpage/review-selector';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Reviews() {
  // ユーザ情報取得
  const session = useSession();
  const userId = session?.data?.user?.id || '';

  // クエリパラメータ取得
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  // userIdを元にレビューを取得
  const {
    data,
    isError,
    error,
    isLoading: isLoadingReviews,
  } = useQuery({
    queryKey: ['reviews', currentPage],
    queryFn: () => getReviewsAndCountByUserId(userId, Number(currentPage)),
  });

  // エラーが発生した場合
  if (isError) {
    return (
      <div className="mt-3 text-center text-3xl font-bold">{error.message}</div>
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

  //　pageSizeで割り切れる場合と割り切れない場合でページ数を変更
  const totalPage =
    reviewCount % PAGE_SIZE === 0
      ? reviewCount / PAGE_SIZE
      : Math.floor(reviewCount / PAGE_SIZE) + 1;

  return (
    <>
      <ReviewSlector />
      <ReviewTemplate
        session={session.data}
        reviews={data.reviewsByUserId}
        totalPage={totalPage}
      />
    </>
  );
}
