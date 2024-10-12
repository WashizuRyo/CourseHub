import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export default function ValidateParams(req: NextRequest) {
  // ページ番号を取得
  const currentPage = Number(req.nextUrl.searchParams.get('page'));

  // ページ番号のバリデーション
  const currentPageSchema = z.number().int().positive();
  const result = currentPageSchema.safeParse(currentPage);
  if (!result.success) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  return { currentPage };
}
