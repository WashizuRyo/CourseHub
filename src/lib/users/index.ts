import { getLikedReviewsAndCountByUserId } from '@/lib/api/users/get-liked-reviews-and-count-by-user-id'
import { getReviewsAndCountByUserId } from '@/lib/api/users/get-review-and-count-by-user-id'
import { useQuery } from '@tanstack/react-query'

export function useGetLikedReviewsAndCountByUserId(userId: string, currentPage: number) {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () => getLikedReviewsAndCountByUserId(userId, Number(currentPage)),
  })

  return {
    data,
    error,
    isError,
    isPending,
  }
}

export function useGetReviewsAndCountByUserId(userId: string, currentPage: number) {
  // userIdを元にレビューを取得
  const {
    data,
    isError,
    error,
    isLoading: isLoadingReviews,
  } = useQuery({
    queryKey: ['reviews', currentPage],
    queryFn: () => getReviewsAndCountByUserId(userId, Number(currentPage)),
  })

  return { data, isError, error, isLoadingReviews }
}
