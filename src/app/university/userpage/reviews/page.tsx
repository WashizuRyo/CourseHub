'use client';

import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewTemplate from '@/app/ui/universities/review-template';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
    queryKey: ['totalPage'],
    queryFn: () =>
      fetch(`http://localhost:3000/api/reviews/${userId}/`).then((res) =>
        res.json(),
      ),
  });

  //一回のレビュー表示数
  const pageSize = 2;
  //総ページ数
  const totalPage =
    data % pageSize == 0 ? data / pageSize : data / pageSize + 1;

  if (isLoadingReviews || isLodingTotalPage)
    return (
      <>
        <div className="flex justify-center">
          <Button>reviews</Button>
          <Button>likes</Button>
        </div>
        <SearchReviewSkeleton />
      </>
    );

  return (
    <>
      <div className="flex justify-center">
        <Box>
          <Button>reviews</Button>
        </Box>
        <Link href="/university/userpage/likes">
          <Button>LIKES</Button>
        </Link>
      </div>
      <ReviewTemplate
        session={session.data}
        reviews={reviews}
        totalPage={totalPage}
      />
    </>
  );
}
