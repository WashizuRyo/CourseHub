import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import ReviewsSkeleton from '@/components/skeletons/ReviewsSkeleton'
import Spinner from '@/components/Spinner'
import ReviewSearch from '@/components/universities/review-search/review-search'
import ReviewsWrap from '@/components/universities/reviews-wrap'
import { fetchUniversityByUniversityId } from '@/lib/data'
import type { searchParmas } from '@/lib/definitions'
import { getQueryParams } from '@/lib/functions'
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: searchParmas }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ReviewSearchPage universityId={params.id} searchParams={searchParams} />
    </Suspense>
  )
}

async function ReviewSearchPage({ universityId, searchParams }: { universityId: string; searchParams: searchParmas }) {
  const university = await fetchUniversityByUniversityId(Number(universityId))
  const { className, faculty } = getQueryParams(searchParams)

  if (!university) {
    notFound()
  }

  return (
    <main>
      <div className='flex flex-col'>
        {/* パソコンから閲覧した場合 */}
        <div className='hidden md:block'>
          <div className='ml-4 mt-2 flex justify-between'>
            {/* パンクズリスト */}
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
            {/* 講義レビュー投稿フォームへのリンク */}
            <Link
              href={`/universities/${universityId}/reviews/new`}
              className='m-2 w-64 gap-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-400'
            >
              <div className='flex gap-4 p-4'>
                <span className='flex items-center'>講義レビューを投稿する</span>
                <div>
                  <ArrowRightIcon className='size-8' />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* スマホから閲覧した場合 */}
        <div className='block md:hidden'>
          <div className='ml-5 flex justify-between'>
            {/* パンクズリスト */}
            <section className='flex items-center'>
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
            {/* 講義レビュー投稿フォームへのリンク */}
            <Link
              href={`/universities/${universityId}/reviews/new`}
              className='m-4 size-[54px] rounded-2xl bg-blue-500 hover:bg-blue-400'
            >
              <div className='p-4'>
                <PlusIcon className='flex size-6 items-center text-white' />
              </div>
            </Link>
          </div>
        </div>

        {/* 講義名入力欄, 学部選択メニュー, ソート選択メニュー */}
        <section className='flex justify-center px-7 pt-2'>
          <ReviewSearch />
        </section>
      </div>

      {/* 講義名または学部名が入力または選択された場合 */}
      <section className='mt-4'>
        {className || faculty ? (
          <Suspense key={className + faculty} fallback={<ReviewsSkeleton />}>
            <ReviewsWrap searchParams={searchParams} />
          </Suspense>
        ) : (
          <p className='text-center text-xl'>授業名または学部名を入力してください</p>
        )}
      </section>
    </main>
  )
}
