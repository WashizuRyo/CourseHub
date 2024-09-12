import { prisma } from '@/app/lib/prisma';
import { auth } from '@@/auth';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { userId: string } },
) {
  let { userId } = params;

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

  if (session?.user?.name == 'Bob Alice') {
    userId = process.env.TEST_ID!;
  }

  try {
    const data = await prisma.reviews.count({
      where: { createdBy: userId },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch likes' },
      { status: 500 },
    );
  }
}
