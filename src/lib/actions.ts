'use server'

import type { OriginalReview } from '@/lib/definitions'
import { createReview as createReviewData, updateReview as udpateReviewData } from '@/model/review'
import { auth, signIn, signOut } from '@@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from './prisma'

export type State = {
  errors?: {
    className?: string[]
    faculty?: string[]
    title?: string[]
    star?: string[]
    evaluation?: string[]
    who?: string[]
  } | null
  message?: string | null
}

const FormSchema = z.object({
  id: z.string(),
  faculty: z.enum(['理学部', '工学部', '文学部', '経済部'], {
    invalid_type_error: '無効な値です',
  }),
  className: z
    .string({
      invalid_type_error: '有効な授業名を入力してください',
    })
    .min(1, { message: '授業名は１文字以上でなければなりません' })
    .max(31, { message: 'タイトルは31文字以下でなければなりません' }),
  title: z
    .string({ invalid_type_error: '有効なタイトルを入力してください' })
    .min(1, { message: 'タイトルは1文字以上でなければなりません' })
    .max(31, { message: 'タイトルは31文字以下でなければなりません' }),
  star: z.coerce.number().min(1, { message: '総合評価を選択してください' }),
  evaluation: z
    .string({
      invalid_type_error: '有効な授業評価を入力してください',
    })
    .max(511, { message: '授業評価は511文字以下でなければなりません' }),
  date: z.string(),
  universityId: z.coerce.number(),
  who: z.enum(['username', 'anonymous'], {
    invalid_type_error: '投稿者名を選択してください。',
  }),
})

const CreateAndUpdateReview = FormSchema.omit({
  id: true,
  date: true,
  universityId: true,
})

export type ReviewData = z.infer<typeof CreateAndUpdateReview>

export async function createReview(universityId: number, prevState: State, formData: FormData): Promise<State> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  const validatedFields = CreateAndUpdateReview.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくありません。レビュー作成に失敗しました。',
    }
  }

  return await createReviewData({ formData: validatedFields.data, universityId, createdBy: session.user.id })
}

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

export async function singOut() {
  await signOut()
}

export async function singIn() {
  await signIn()
}

export async function updateReviewFromForm(
  { universityId, id: reviewId, createdBy }: OriginalReview,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('ログインしてください')
  }

  if (session.user.id !== createdBy) {
    throw new Error('このレビューを更新する権限がありません')
  }

  const validatedFields = CreateAndUpdateReview.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくないです。レビュー作成に失敗しました。',
    }
  }

  return await udpateReviewData({ formData: validatedFields.data, universityId, reviewId })
}
