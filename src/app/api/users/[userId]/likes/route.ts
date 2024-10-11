import { PAGE_SIZE } from '@/app/lib/constants';
import { paramsSchema } from '@/app/lib/zod-schema';
import { auth } from '@@/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse, type NextRequest } from 'next/server';

const prisma = new PrismaClient({
  log: ['query'], // クエリのログを出力する設定（開発中のみ有効）
});

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  },
) {
  // ユーザーIDとページ番号を取得
  const { userId } = params;
  const currentPage = Number(req.nextUrl.searchParams.get('page'));
  const paramsAndQueryParams = { userId, currentPage };

  // ユーザーIDとページ番号のバリデーション
  const result = paramsSchema.safeParse(paramsAndQueryParams);
  if (!result.success) {
    return NextResponse.json(
      { message: 'Invalid userId or page parameter' },
      { status: 401 },
    );
  }

  // セッションを取得
  const session = await auth();

  // セッションがないか、セッションのユーザーIDがリクエストのユーザーIDと一致しない場合はエラーを返す
  if (!session || session?.user?.id !== userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }

  // if (session?.user?.name == 'Bob Alice') {
  //   userId = process.env.TEST_ID!;
  // }

  try {
    const likedReviewByUserId = await prisma.reviews.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: { user: true },
      skip: PAGE_SIZE * (currentPage - 1),
      take: PAGE_SIZE,
    });
    const likedReviewCountByUserId = await prisma.reviews.count({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
    });
    const dataWithIsLiked = likedReviewByUserId.map((review) => {
      return { ...review, isLiked: true };
    });
    return NextResponse.json({ dataWithIsLiked, likedReviewCountByUserId });
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch likes' },
      { status: 500 },
    );
  }
}
