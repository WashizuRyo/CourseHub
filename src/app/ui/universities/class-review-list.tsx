import Breadcrumb from '@/app/ui/breadcrumb/breadcrumb';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchReviewsByClass, fetchTotalPage } from '../../lib/data';
import SearchClass from './class';
import Reviews from './search-reviews';

export default async function ClassReviewList({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const id = parseInt(params.id);
  const reviewsWithClass = await fetchReviewsByClass(query, currentPage);
  const totalPage = await fetchTotalPage(query);

  return (
    <div>
      <div className="flex flex-col">
        {/* パソコンから閲覧した場合 */}
        <div className="hidden md:block">
          <div className="ml-4 mt-2 flex justify-between">
            <div className="m-2 flex items-center">
              <Breadcrumb
                breadcrumbs={[
                  { label: '大学名検索', href: '/' },
                  {
                    label: '講義名検索',
                    href: `/university/${params.id}`,
                    active: true,
                  },
                ]}
              />
            </div>
            <div className="m-2 flex w-64 items-center gap-3 rounded-2xl bg-blue-500 p-4 text-white hover:bg-blue-400">
              <Link href={`/university/${id}/create`}>
                講義レビューを投稿する
              </Link>
              <ArrowRightIcon className="size-6" />
            </div>
          </div>
        </div>

        {/* スマホから閲覧した場合 */}
        <div className="block md:hidden">
          <div className="ml-5 flex justify-between">
            <div className="flex items-center">
              <Breadcrumb
                breadcrumbs={[
                  { label: '大学名検索', href: '/' },
                  {
                    label: '講義名検索',
                    href: `/university/${params.id}`,
                    active: true,
                  },
                ]}
              />
            </div>
            <div className="m-4 size-[54px] rounded-2xl bg-blue-500 p-4 hover:bg-blue-400">
              <Link href={`/university/${id}/create`}>
                <PlusIcon className="size-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* 検索欄 */}
        <div className="flex justify-center px-7 pt-2">
          <SearchClass placeholder="授業名を入力" />
        </div>
      </div>

      <div className="mt-4">
        {query ? (
          <Suspense fallback={<SearchReviewSkeleton />}>
            <Reviews
              query={query}
              reviewsWithClass={reviewsWithClass}
              id={params.id}
              totalPage={totalPage}
            />
          </Suspense>
        ) : (
          <p className="text-center text-xl">授業名を入力してください</p>
        )}
      </div>
    </div>
  );
}
