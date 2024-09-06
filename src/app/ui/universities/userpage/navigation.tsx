import clsx from 'clsx';
import Link from 'next/link';

export default function Navigation({
  isReviewPage,
}: {
  isReviewPage: boolean;
}) {
  return (
    <div className="flex justify-center gap-5">
      <Link
        href="/university/userpage/reviews"
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        投稿したレビュー
      </Link>
      <Link
        href="/university/userpage/likes"
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          !isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        いいね
      </Link>
    </div>
  );
}
