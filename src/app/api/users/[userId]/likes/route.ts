import authenticateSession from '@/app/lib/api/users/authenticate-session';
import {
  fetchLikedReviewByUserId,
  fetchLikedReviewCountByUserId,
} from '@/app/lib/api/users/user-queries';
import validateParams from '@/app/lib/api/users/validate-params';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  },
) {
  // ユーザーIDとページ番号をバリデーション
  const validationResponse = validateParams(req);
  // バリデーションエラーがある場合はエラーを返す
  if (validationResponse instanceof NextResponse) {
    return validationResponse;
  }

  // セッションを認証
  const authenticateSessionResponse = await authenticateSession(params.userId);
  // 未認証、権限がない場合はエラーを返す
  if (authenticateSessionResponse instanceof NextResponse) {
    return authenticateSessionResponse;
  }

  // if (session?.user?.name == 'Bob Alice') {
  //   userId = process.env.TEST_ID!;
  // }

  try {
    // ユーザーIDがいいねしたレビューとその総数を取得
    const [likedReviewByUserId, likedReviewCountByUserId] = await Promise.all([
      fetchLikedReviewByUserId(
        authenticateSessionResponse,
        validationResponse.currentPage,
      ),
      fetchLikedReviewCountByUserId(authenticateSessionResponse),
    ]);
    // いいねしたレビューにisLikedプロパティを追加
    const likedReviewByUserIdWithIsLikedTrue = likedReviewByUserId.map(
      (review) => {
        return { ...review, isLiked: true };
      },
    );
    return NextResponse.json({
      likedReviewByUserIdWithIsLikedTrue,
      likedReviewCountByUserId,
    });
  } catch (error) {
    console.error('Database Error', error);
    return NextResponse.json(
      { message: 'Failed to fetch likes' },
      { status: 500 },
    );
  }
}
