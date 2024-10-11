'use client';

import { PAGE_SIZE } from '@/app/lib/constants';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import Navigation from '@/app/ui/universities/userpage/navigation';
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
  const { data, isLoading: isLoadingLikedReviews } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/likes?page=${currentPage}`,
      ).then((res) => res.json()),
  });

  // ローディング中
  if (isLoadingLikedReviews)
    return (
      <>
        <Navigation isReviewPage={false} />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );

  // いいねしたレビューがなかった場合
  if (data.dataWithIsLiked.length === 0)
    return (
      <>
        <Navigation isReviewPage={false} />
        <div className="m-4 text-center text-xl">
          いいねをするといいねしたレビューが表示されます
        </div>
      </>
    );

  // いいねしたレビューの数
  const likedReviewsCount = data.likedReviewCountByUserId;

  //　pageSizeで割り切れる場合と割り切れない場合でページ数を変更
  const totalPage =
    likedReviewsCount % PAGE_SIZE == 0
      ? likedReviewsCount / PAGE_SIZE
      : Math.floor(likedReviewsCount / PAGE_SIZE) + 1;

  // いいねしたレビューを表示
  return (
    <>
      <Navigation isReviewPage={false} />
      <ReviewTemplate
        session={session.data}
        reviews={data.dataWithIsLiked}
        totalPage={totalPage}
      />
    </>
  );
}
