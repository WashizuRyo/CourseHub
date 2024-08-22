import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchReviewsByClass } from '../../lib/data';
import SearchClass from './class';
import Reviews from './search-reviews';

export default async function ClassReviewList({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const id = parseInt(params.id);
  const reviewsWithClass = await fetchReviewsByClass(query);

  return (
    <div>
      <div className="flex flex-col">
        <div className="hidden sm:block">
          <div className="mt-2 flex justify-end">
            <div className="m-2 flex w-64 justify-center gap-3 rounded-2xl bg-blue-500 p-4 text-white hover:bg-blue-400">
              <Link href={`/university/${id}/create`}>
                講義レビューを投稿する
              </Link>
              <ArrowRightIcon className="size-6" />
            </div>
          </div>
        </div>
        <div className="block sm:hidden">
          <div className="flex justify-end">
            <div className="m-4 size-[54px] rounded-2xl bg-blue-500 p-4 hover:bg-blue-400">
              <Link href={`/university/${id}/create`}>
                <PlusIcon className="size-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center px-7 pt-2">
          <SearchClass placeholder="授業名を入力" />
        </div>
      </div>
      {/* <SearchReviewSkeleton /> */}
      <div className="mt-4">
        {query ? (
          <Suspense fallback={<SearchReviewSkeleton />}>
            <Reviews
              query={query}
              reviewsWithClass={reviewsWithClass}
              id={params.id}
            />
          </Suspense>
        ) : (
          <p className="h-screen text-center text-xl">
            授業名を入力してください
          </p>
        )}
      </div>
    </div>
  );
}
