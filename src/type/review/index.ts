import { ReviewDataSchema } from '@/type/review/schema'
import { User } from '@/type/user'
import { Likes } from '@prisma/client'
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

export type Review = {
  faculty: string
  id: number
  date: string
  title: string
  star: number
  createdBy: string
  className: string
  isAnonymous: boolean
  evaluation: string
  universityId: number
  user: User
  likes?: Likes[]
}

export type OriginalReview = {
  id: number
  date: string
  className: string
  title: string
  star: number
  evaluation: string
  universityId: number
  createdBy: string
  faculty: string
  isAnonymous: boolean
}

export type ReviewWithMetadata = Review & {
  isLiked: boolean
  isAuthor: boolean
}

export type ReviewWithIsLiked = Review & {
  isLiked: boolean
}

export type ReviewData = z.infer<typeof ReviewDataSchema>
