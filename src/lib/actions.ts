'use server'

import { auth } from '@@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

export async function deleteReview(evaluationId: number, id: number, query: string, accessPath: string) {
  const session = await auth()
  try {
    await prisma.reviews.delete({
      where: { id: evaluationId },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Database Error: Failed to Delete Review')
  }

  // accessPathが/universities/[一文字以上の任意の数字]の場合/universities/${id}?classname=${classname}に
  // リダイレクトする(大学名検索欄から閲覧し削除した時)
  // それ以外の場合はaccessPathにリダイレクトする(userページから削除した時)
  const regix = new RegExp('^/universities/\\d+$')

  if (regix.test(accessPath)) {
    revalidatePath(`/universities/${id}?classname=${encodeURIComponent(query)}`)
    redirect(`/universities/${id}?classname=${encodeURIComponent(query)}`)
  } else {
    revalidatePath(`/users/${session?.user?.id}/likes`)
    redirect(`/users/${session?.user?.id}/likes`)
  }
}
