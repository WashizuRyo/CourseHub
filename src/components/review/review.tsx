import { StarNumber } from '@/components/review/star-number'
import DeleteDialog from '@/components/universities/delete-dialog'
import Likes from '@/components/universities/likes'
import { DefaultUserAvatar } from '@/components/user/default-user-avatar'
import { UserAvatar } from '@/components/user/user-avatar'
import { DEFAULT_NAME } from '@/lib/constants'
import type { ReviewWithMetadata } from '@/lib/definitions'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Review = ({ review }: { review: ReviewWithMetadata }) => {
  return (
    <div key={review.id} className='p-1'>
      <div className='rounded-md bg-white p-2'>
        {/* ユーザ画像表示 */}
        <div className='flex'>
          {review.isAnonymous ? (
            <>
              <DefaultUserAvatar />
              <span className='ml-2 flex items-center text-xl'>匿名</span>
            </>
          ) : (
            <>
              <UserAvatar imageUrl={review.user.image} />
              <span className='ml-2 flex items-center break-all text-xl'>{review.user.name || DEFAULT_NAME}</span>
            </>
          )}
        </div>

        {/* 学部名 */}
        <div className='mt-3'>{review.faculty}</div>

        {/* 授業名 */}
        <div className='mt-2 text-xl'>{review.className}</div>

        {/* スマホから閲覧した場合のレビュータイトル */}
        <div className='mb-1 mt-2 break-all md:hidden'>
          <p className='text-xl'>{review.title}</p>
        </div>

        <div className='mb-2'>
          <div className='flex'>
            {/* 星の数 */}
            <StarNumber starNumber={review.star} />

            {/* パソコンから閲覧した場合のレビュータイトル */}
            <div className='hidden md:ml-2 md:flex md:items-center'>
              <p className='text-2xl'>{review.title}</p>
            </div>
          </div>

          {/* レビューした日 */}
          <p className='my-1 text-gray-400'>{review.date}にレビュー</p>

          {/* レビュー内容 */}
          <p className='w-128 whitespace-break-spaces break-all leading-7'>{review.evaluation}</p>
        </div>

        <div className='flex justify-between'>
          {/* いいね機能 */}
          <div className='flex items-end'>
            <div className='flex flex-col'>
              <Likes reviewId={review.id} isLiked={review.isLiked} />
            </div>
          </div>

          {/* 編集と削除ページへのリンク */}
          {review.isAuthor && (
            <div className='mt-6 flex justify-end gap-2'>
              <div className='flex flex-col items-center'>
                <div className='rounded-md border border-green-400 p-2 shadow-sm hover:bg-gray-100'>
                  <Link href={`/universities/${review.universityId}/reviews/${review.id}`} aria-label='編集'>
                    <PencilSquareIcon className='size-5 text-green-400' />
                  </Link>
                </div>
              </div>
              <DeleteDialog universityId={review.universityId} evaluationId={review.id} query={review.className} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
