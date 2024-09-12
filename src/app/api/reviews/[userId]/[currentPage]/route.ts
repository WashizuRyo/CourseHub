import { auth } from '@@/auth';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient({
  log: ['query'], // クエリのログを出力する設定（開発中のみ有効）
});

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string; currentPage: number };
  },
) {
  let { userId } = params;
  const currentPage = params.currentPage;
  const session = await auth();

  if (typeof userId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Id parameter' },
      { status: 401 },
    );
  }

  if (!session || session?.user?.id !== userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }

  const pageSize = 5;

  if (session?.user?.name == 'Bob Alice') {
    userId = process.env.TEST_ID!;
  }

  try {
    const data = await prisma.reviews.findMany({
      where: { createdBy: userId },
      include: { user: true },
      skip: pageSize * (currentPage - 1),
      take: pageSize,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews' },
      { status: 500 },
    );
  }
}
