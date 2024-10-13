import { getLikedReviewsAndCountByUserId } from '@/app/lib/api/users/get-liked-reviews-and-count-by-user-id';
import { getReviewsAndCountByUserId } from '@/app/lib/api/users/get-review-and-count-by-user-id';
import { useQuery } from '@tanstack/react-query';

export function useGetLikedReviewsAndCountByUserId(
  userId: string,
  currentPage: number,
) {
  const {
    data,
    error,
    isError,
    isLoading: isLoadingLikedReviews,
  } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () => getLikedReviewsAndCountByUserId(userId, Number(currentPage)),
  });

  return {
    data,
    error,
    isError,
    isLoadingLikedReviews,
  };
}

export function useGetReviewsAndCountByUserId(
  userId: string,
  currentPage: number,
) {
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

  return { data, isError, error, isLoadingReviews };
}
