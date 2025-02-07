import type { ReviewsAndCount } from '@/lib/definitions'

export async function getReviewsAndCountByUserId(userId: string, currentPage: number): Promise<ReviewsAndCount> {
  const res = await fetch(`/api/users/${userId}/reviews?page=${currentPage}`)

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  return res.json()
}
