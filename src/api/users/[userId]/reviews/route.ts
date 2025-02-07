import authenticateSession from '@/lib/api/users/authenticate-session'
import { fetchReviewCountByUserId, fetchReviewsByUserId } from '@/lib/api/users/user-queries'
import validateParams from '@/lib/api/users/validate-params'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  // ページ番号をバリデーション
  const validationResponse = validateParams(req)
  // バリデーションエラーがある場合はエラーを返す
  if (validationResponse instanceof NextResponse) {
    return validationResponse
  }

  // セッションを認証
  const authenticateSessionResponse = await authenticateSession(params.userId)
  // 未認証、権限がない場合はエラーを返す
  if (authenticateSessionResponse instanceof NextResponse) {
    return authenticateSessionResponse
  }

  try {
    // ユーザーIDに紐づくレビューとその総数を取得
    const [reviewsByUserId, reviewCountByUserId] = await Promise.all([
      fetchReviewsByUserId(authenticateSessionResponse.user?.id, validationResponse.currentPage),
      fetchReviewCountByUserId(authenticateSessionResponse.user?.id),
    ])
    return NextResponse.json({ reviewsByUserId, reviewCountByUserId }, { status: 200 })
  } catch (error) {
    console.error('Database Error', error)
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 })
  }
}
