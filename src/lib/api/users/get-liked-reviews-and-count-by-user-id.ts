import type { likedReviewsAndCount } from '@/lib/definitions'

export async function getLikedReviewsAndCountByUserId(
  userId: string,
  currentPage: number,
): Promise<likedReviewsAndCount> {
  const res = await fetch(`/api/users/${userId}/likes?page=${currentPage}`)

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  return res.json()
}
