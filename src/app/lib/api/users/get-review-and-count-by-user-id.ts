import type { ReviewsAndCount } from '@/app/lib/definitions';

export async function getReviewsAndCountByUserId(
  userId: string,
  currentPage: number,
): Promise<ReviewsAndCount> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/reviews?page=${currentPage}`,
  );

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json();
}
