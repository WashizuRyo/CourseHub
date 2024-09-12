import { prisma } from '@/app/lib/prisma';
import { auth } from '@@/auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextResponse,
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
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: { user: true },
      skip: pageSize * (currentPage - 1),
      take: pageSize,
    });
    const dataWithIsLiked = data.map((review) => {
      return { ...review, isLiked: true };
    });
    return NextResponse.json(dataWithIsLiked);
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch likes' },
      { status: 500 },
    );
  }
}
