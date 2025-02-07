import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import Form from '@/components/review/Form'
import { auth } from '@@/auth'
import { Suspense } from 'react'

export default function ReviewNewPage({ params }: { params: { id: string } }) {
  const { id: universityId } = params

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Review universityId={universityId} />;
    </Suspense>
  )
}

async function Review({ universityId }: { universityId: string }) {
  const session = await auth()
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
      <Form universityId={universityId} userName={session.user?.name} />
    </>
  )
}
