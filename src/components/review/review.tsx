import { DEFAULT_NAME } from '@/app/lib/constants'
import type { ReviewWithLike } from '@/app/lib/definitions'
import { EditLink } from '@/components/review/edit-link'
import { StarNumber } from '@/components/review/star-number'
import DeleteDialog from '@/components/universities/delete-dialog'
import Likes from '@/components/universities/likes'
import { DefaultUserAvatar } from '@/components/user/default-user-avatar'
import { UserAvatar } from '@/components/user/user-avatar'

type Props = {
  review: ReviewWithLike
  userId: string | undefined
}

export const Review = ({ review, userId }: Props) => {
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
          {/* 自分の投稿したレビューにはいいね機能が表示されないようにする。またログインしていない場合も表示しない */}
          {review.createdBy === userId ? (
            <div></div>
          ) : (
            <div className='flex items-end'>
              <div className='flex flex-col'>
                <Likes reviewId={review.id} isLiked={review.isLiked} />
                <span className='mt-1 text-sm'>いいね</span>
              </div>
            </div>
          )}

          {/* 編集と削除ページへのリンク */}
          {userId === review.createdBy && (
            <div className='mt-6 flex justify-end gap-2'>
              <EditLink href={`/universities/${review.universityId}/reviews/edit/${review.id}}`} />
              <DeleteDialog universityId={review.universityId} evaluationId={review.id} query={review.className} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
