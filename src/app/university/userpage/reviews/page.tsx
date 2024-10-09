'use client';

import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import Navigation from '@/app/ui/universities/userpage/navigation';
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
  const { data, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/reviews?page=${currentPage}`,
      ).then((res) => res.json()),
  });

  // ローディング中
  if (isLoadingReviews) {
    return (
      <>
        <Navigation isReviewPage={true} />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );
  }

  // 一度もレビューを投稿していない場合
  if (data.reviewsByUserId.length == 0) {
    return (
      <>
        <Navigation isReviewPage={true} />
        <div className="mt-3 text-center text-xl">
          投稿したレビューがありません
        </div>
      </>
    );
  }

  //　一回のレビュー表示数
  const pageSize = 5;
  //　pageSizeで割り切れる場合と割り切れない場合でページ数を変更
  const totalPage =
    data.reviewCount % pageSize == 0
      ? data.reviewCount / pageSize
      : Math.floor(data.reviewCount / pageSize) + 1;

  return (
    <>
      <Navigation isReviewPage={true} />
      <ReviewTemplate
        session={session.data}
        reviews={data.reviewsByUserId}
        totalPage={totalPage}
      />
    </>
  );
}
