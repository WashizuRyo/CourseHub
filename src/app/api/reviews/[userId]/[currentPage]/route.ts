import { prisma } from '@/app/lib/prisma';
import { auth } from '@@/auth';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { userId: string; currentPage: number } },
) {
  const { userId } = params;
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

  const pageSize = 2;

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
