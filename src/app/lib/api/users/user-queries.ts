import { PAGE_SIZE } from '@/app/lib/constants';
import type { Review } from '@/app/lib/definitions';
import { prisma } from '@/app/lib/prisma';
import type { Session } from 'next-auth';

// ユーザIDに紐づくいいねしたレビューを取得
export async function fetchLikedReviewByUserId(
  session: Session,
  currentPage: number,
) {
  return await prisma.reviews.findMany({
    where: {
      likes: {
        some: {
          userId: session.user?.id,
        },
      },
    },
    include: { user: true },
    skip: PAGE_SIZE * (currentPage - 1),
    take: PAGE_SIZE,
  });
}

// ユーザIDに紐づくいいねしたレビューの総数を取得
export async function fetchLikedReviewCountByUserId(session: Session) {
  return await prisma.reviews.count({
    where: {
      likes: {
        some: {
          userId: session.user?.id,
        },
      },
    },
  });
}

// ユーザーIDに紐づくレビューを取得
export async function fetchReviewsByUserId(
  userId: string | undefined,
  currentPage: number,
): Promise<Review[]> {
  // ユーザーIDがundefinedの場合は空の配列を返す
  if (userId === undefined) return [];

  return await prisma.reviews.findMany({
    where: { createdBy: userId },
    include: { user: true },
    skip: PAGE_SIZE * (currentPage - 1),
    take: PAGE_SIZE,
  });
}

// ユーザーIDに紐づくレビューの総数を取得
export async function fetchReviewCountByUserId(
  userId: string | undefined,
): Promise<number> {
  // ユーザーIDがundefinedの場合は0を返す
  if (userId === undefined) return 0;

  return await prisma.reviews.count({
    where: { createdBy: userId },
  });
}
