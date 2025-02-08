'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ReviewTabs({ userId }: { userId: string }) {
  const pathname = usePathname()
  const isReviewPage = pathname.split('/')[3].includes('reviews')

  return (
    <div className='flex justify-center gap-5 pb-6'>
      <Link
        href={`/users/${userId}/reviews`}
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        投稿したレビュー
      </Link>

      <Link
        href={`/users/${userId}/likes`}
        className={clsx(
          'rounded border p-2 hover:border-blue-400 hover:bg-sky-200',
          !isReviewPage && 'border-blue-400 bg-sky-200',
        )}
      >
        いいねしたレビュー
      </Link>
    </div>
  )
}
