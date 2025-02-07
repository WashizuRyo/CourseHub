import { DEFAULT_CLASS_NAME, DEFAULT_FACULTY_NAME, DEFAULT_SORT, PAGE_SIZE } from '@/lib/constants'
import type { Review, ReviewWithLike, searchParmas } from '@/lib/definitions'
import type { Session } from 'next-auth'

export function getTotalPage(pageCount: number) {
  if (pageCount <= 0) return 0
  //　PAZE_SIZEで割り切れる場合と割り切れない場合でページ数を変更
  return pageCount % PAGE_SIZE === 0 ? pageCount / PAGE_SIZE : Math.floor(pageCount / PAGE_SIZE) + 1
}

export function getQueryParams(searchParams: searchParmas) {
  // QueryParamsを取得
  const className = searchParams.className || DEFAULT_CLASS_NAME
  const currentPage = Number(searchParams.page)
  const sort = searchParams.sort || DEFAULT_SORT
  const faculty = searchParams.faculty || DEFAULT_FACULTY_NAME

  return { className, currentPage, sort, faculty }
}

export function getAddedIsLikedFieldToReviews(reviews: Review[], session: Session | null): ReviewWithLike[] {
  const reviewsAddedIsLiked = reviews.map((review) => {
    // レビューをいいねした人の中にsession?.user?.idがあったらtrueを返す
    // booleanがわかればいいのでmapではなくsomeを使用
    const isLiked = review.likes?.some((like) => like.userId === session?.user?.id) || false

    // 新しいオブジェクトを返す
    return { ...review, isLiked }
  })

  return reviewsAddedIsLiked
}
