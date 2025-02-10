'use server'

import { deleteLike, postLike } from '@/model/like'
import { auth } from '@@/auth'

export async function saveLike(reviewId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  await postLike(reviewId, session?.user?.id)
}

export async function removeLike(reviewId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  await deleteLike(reviewId, session.user.id)
}
