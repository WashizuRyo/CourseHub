'use client';

import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import Navigation from '@/app/ui/universities/userpage/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Likes() {
  const session = useSession();
  const userId = session?.data?.user?.id || '';
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const { data: likedReviews, isLoading: isLoadingLikedReviews } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () =>
      fetch(`http://localhost:3000/api/likes/${userId}/${currentPage}`).then(
        (res) => res.json(),
      ),
  });

  const { data, isLoading: isLodingTotalPage } = useQuery({
    queryKey: ['totalPage', likedReviews],
    queryFn: () =>
      fetch(`http://localhost:3000/api/likes/${userId}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoadingLikedReviews || isLodingTotalPage)
    return (
      <>
        <Navigation isReviewPage={false} />
        <div className="mt-3">
          <SearchReviewSkeleton />
        </div>
      </>
    );

  if (likedReviews.length === 0)
    return (
      <>
        <Navigation isReviewPage={false} />
        <div className="m-4 text-center text-xl">
          いいねをするといいねしたレビューが表示されます
        </div>
      </>
    );

  //一回のレビュー表示数
  const pageSize = 2;
  //総ページ数
  const totalPage =
    data % pageSize == 0 ? data / pageSize : Math.floor(data / pageSize) + 1;

  return (
    <>
      <Navigation isReviewPage={false} />
      <ReviewTemplate
        session={session.data}
        reviews={likedReviews}
        totalPage={totalPage}
      />
    </>
  );
}
