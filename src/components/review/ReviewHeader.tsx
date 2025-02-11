import Breadcrumb from '@/components/utils/Breadcrumb'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ReviewHeader({ universityId }: { universityId: string }) {
  return (
    <div className='ml-4 mt-2 flex justify-between'>
      <section className='m-2 flex items-center'>
        <Breadcrumb
          breadcrumbs={[
            { label: '大学名検索', href: '/' },
            {
              label: '講義名検索',
              href: `/universities/${universityId}`,
              active: true,
            },
          ]}
        />
      </section>
      <Link
        href={`/universities/${universityId}/reviews/new`}
        className='m-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-400 md:w-64'
      >
        <div className='flex items-center gap-4 p-3 md:p-4'>
          <span className='hidden md:block'>講義レビューを投稿する</span>
          <ArrowRightIcon className='size-8' />
        </div>
      </Link>
    </div>
  )
}
