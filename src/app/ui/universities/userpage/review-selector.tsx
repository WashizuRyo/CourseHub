'use client';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ReviewSlector() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // 自分が投稿したレビューページかどうか確認
  const isReviewPage = pathname.split('/')[3].includes('reviews');

  return (
    <div className="flex justify-center gap-5">
      {/* 投稿したレビューへのリンク */}
      <Link
        href={`/users/${session?.user?.id}/reviews`}
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        投稿したレビュー
      </Link>

      {/* いいねしたレビューへのリンク */}
      <Link
        href={`/users/${session?.user?.id}/likes`}
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          !isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        いいねしたレビュー
      </Link>
    </div>
  );
}
