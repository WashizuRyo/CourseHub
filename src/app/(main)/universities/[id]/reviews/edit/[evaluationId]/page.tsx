import UpdateReview from '@/components/universities/form/update-review-form'
import NotAllowed from '@/components/universities/not-allowed'
import fetchReviewByEvaluationId from '@/lib/data'
import { auth } from '@@/auth'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function ReviewEditPage({ params }: { params: { evaluationId: string; id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Review universityId={params.id} evaluationId={params.evaluationId} />
    </Suspense>
  )
}

async function Review({ universityId, evaluationId }: { universityId: string; evaluationId: string }) {
  const review = await fetchReviewByEvaluationId(Number(evaluationId))
  const session = await auth()
  if (!review) {
    notFound()
  }
  if (session?.user?.id !== review?.createdBy) {
    return <NotAllowed />
  }

  return (
    <>
      <UpdateReview review={review} universityId={universityId} />
    </>
  )
}
