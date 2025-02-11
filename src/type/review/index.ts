import { ReviewDataSchema } from '@/type/review/schema'
import { z } from 'zod'

export type ReviewFormState = {
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

export type ReviewData = z.infer<typeof ReviewDataSchema>
