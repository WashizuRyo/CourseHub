import { Form as ReviewEditForm } from '@/components/review/Form'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NotAllowed from '@/components/utils/NotAllowed'
import Spinner from '@/components/utils/Spinner'
import { updateReview } from '@/entries/review'
import fetchReview from '@/model/review'
import { auth } from '@@/auth'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function ReviewEditPage({ params }: { params: { reviewId: string; id: string } }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Review universityId={params.id} reviewId={params.reviewId} />
    </Suspense>
  )
}

async function Review({ universityId, reviewId: evaluationId }: { universityId: string; reviewId: string }) {
  const review = await fetchReview(Number(evaluationId))
  if (!review) {
    notFound()
  }

  const session = await auth()
  if (session?.user?.id !== review.createdBy) {
    return <NotAllowed />
  }

  const handleSubmit = updateReview.bind(null, review)

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: '大学名検索', href: '/' },
          {
            label: '講義名検索',
            href: `/universities/${universityId}`,
          },
          {
            label: 'レビュー編集',
            href: `/universities/${universityId}/edit/${review.id}`,
            active: true,
          },
        ]}
      />
      <ReviewEditForm
        review={review}
        universityId={universityId}
        userName={session.user?.name}
        onSubmit={handleSubmit}
      />
    </>
  )
}
