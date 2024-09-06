'use client';

import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import Navigation from '@/app/ui/universities/userpage/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Reviews() {
  const session = useSession();
  const userId = session?.data?.user?.id || '';
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', currentPage],
    queryFn: () =>
      fetch(`http://localhost:3000/api/reviews/${userId}/${currentPage}`).then(
        (res) => res.json(),
      ),
  });

  const { data, isLoading: isLodingTotalPage } = useQuery({
    queryKey: ['totalPage', reviews],
    queryFn: () =>
      fetch(`http://localhost:3000/api/reviews/${userId}/`).then((res) =>
        res.json(),
      ),
  });

  if (isLoadingReviews || isLodingTotalPage)
    return (
      <>
        <Navigation isReviewPage={true} />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );
  if (reviews.length == 0) {
    return (
      <>
        <Navigation isReviewPage={true} />
        <div className="mt-3 text-center text-xl">
          投稿したレビューがありません
        </div>
      </>
    );
  }

  //一回のレビュー表示数
  const pageSize = 2;
  //総ページ数
  const totalPage =
    data % pageSize == 0 ? data / pageSize : Math.floor(data / pageSize) + 1;

  return (
    <>
      <Navigation isReviewPage={true} />
      <ReviewTemplate
        session={session.data}
        reviews={reviews}
        totalPage={totalPage}
      />
    </>
  );
}
