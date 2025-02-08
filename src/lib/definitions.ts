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

export type ReviewWithLike = Review & {
  user: User
  isLiked: boolean
}

export type User = {
  name: string | null
  image: string | null
}

export type likedReviewsAndCount = {
  likedReviewByUserIdWithIsLikedTrue: ReviewWithLike[]
  likedReviewCountByUserId: number
}

export type ReviewsAndCount = {
  reviewsByUserId: ReviewWithLike[]
  reviewCountByUserId: number
}

export type Likes = {
  id: number
  reviewId: number
  userId: string
}

export type University = {
  universityId: number
  universityname: string
  date: string
} | null

export type searchParmas = {
  className?: string
  page: string
  sort?: 'asc' | 'desc'
  faculty?: string
}
