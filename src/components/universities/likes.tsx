'use client'

import { removeLike, saveLike } from '@/entries/like'
import { HeartIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

export default function Likes({ reviewId, isLiked }: { reviewId: number; isLiked: boolean }) {
  const [likeStatus, setLikeStatus] = useState(isLiked)
  const like = saveLike.bind(null, reviewId)
  const unlike = removeLike.bind(null, reviewId)

  return (
    <form action={likeStatus ? like : unlike}>
      <button type='submit' onClick={() => setLikeStatus(!likeStatus)} data-testid='likeButton'>
        <HeartIcon className={clsx('size-12', likeStatus ? 'text-red-500' : 'text-gray-500')} />
      </button>
    </form>
  )
}
