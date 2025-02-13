import { Form as ReviewNewForm } from '@/components/review/Form'
import Breadcrumb from '@/components/utils/Breadcrumb'
import Spinner from '@/components/utils/Spinner'
import { createReview } from '@/entries/review'
import { auth } from '@@/auth'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'レビュー新規作成',
}

export default function ReviewNewPage({ params }: { params: { id: string } }) {
  const { id: universityId } = params

  return (
    <Suspense fallback={<Spinner />}>
      <Review universityId={universityId} />
    </Suspense>
  )
}

async function Review({ universityId }: { universityId: string }) {
  const session = await auth()
  const handleSubmit = createReview.bind(null, Number(universityId))

  if (!session) {
    return <p className='mt-4 text-center text-2xl'>右上のアイコンからログインしてください</p>
  }

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
            label: 'レビュー作成',
            href: `/universities/${universityId}/reviews/new`,
            active: true,
          },
        ]}
      />
      <ReviewNewForm universityId={universityId} userName={session.user?.name} onSubmit={handleSubmit} />
    </>
  )
}
