import { PAGE_SIZE } from '@/app/lib/constants';
import { auth } from '@@/auth';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  // ユーザーIDとページ番号を取得
  const { userId } = params;
  const currentPage = Number(req.nextUrl.searchParams.get('page'));

  // セッションを取得
  const session = await auth();

  // TODO: userIdとcurrentPageのバリデーションを追加

  // ユーザーIDが文字列でない場合はエラーを返す
  if (typeof userId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Id parameter' },
      { status: 401 },
    );
  }

  // セッションがないか、セッションのユーザーIDがリクエストのユーザーIDと一致しない場合はエラーを返す
  if (!session || session?.user?.id !== userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  // if (session?.user?.name == 'Bob Alice') {
  //   userId = process.env.TEST_ID!;
  // }

  try {
    // PrismaClientをインスタンス化
    const prisma = new PrismaClient({
      log: ['query'], // クエリのログを出力する設定（開発中のみ有効）
    });

    // ユーザーIDに紐づくレビューを取得
    const reviewsByUserId = await prisma.reviews.findMany({
      where: { createdBy: userId },
      include: { user: true },
      skip: PAGE_SIZE * (currentPage - 1),
      take: PAGE_SIZE,
    });

    // ユーザーIDに紐づくレビューの総数を取得
    const reviewCount = await prisma.reviews.count({
      where: { createdBy: userId },
    });

    return NextResponse.json({ reviewsByUserId, reviewCount }, { status: 200 });
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews' },
      { status: 500 },
    );
  }
}
