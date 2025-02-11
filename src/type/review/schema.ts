import { z } from 'zod'

export const ReviewDataSchema = z.object({
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
  who: z.enum(['username', 'anonymous'], {
    invalid_type_error: '投稿者名を選択してください。',
  }),
})
