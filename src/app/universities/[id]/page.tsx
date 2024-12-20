import { fetchUniversityByUniversityId } from '@/app/lib/data';
import type { searchParmas } from '@/app/lib/definitions';
import { getQueryParams } from '@/app/lib/functions';
import Breadcrumb from '@/app/ui/breadcrumb/breadcrumb';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import ReviewSearch from '@/app/ui/universities/review-search/review-search';
import ReviewsWrap from '@/app/ui/universities/reviews-wrap';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: searchParmas;
}) {
  // QueryPrams(className, faculty)を取得
  const { className, faculty } = getQueryParams(searchParams);

  // // 大学IDを取得
  const universityId = params.id;
  // 大学が存在するか確認
  const university = await fetchUniversityByUniversityId(Number(universityId));
  // 大学が見つからなかった場合
  if (!university) {
    notFound();
  }

  return (
    <main>
      <div className="flex flex-col">
        {/* パソコンから閲覧した場合 */}
        <div className="hidden md:block">
          <div className="ml-4 mt-2 flex justify-between">
            {/* パンクズリスト */}
            <section className="m-2 flex items-center">
              <Breadcrumb
                breadcrumbs={[
                  { label: '大学名検索', href: '/' },
                  {
                    label: '講義名検索',
                    href: `/universities/${params.id}`,
                    active: true,
                  },
                ]}
              />
            </section>
            {/* 講義レビュー投稿フォームへのリンク */}
            <Link
              href={`/universities/${universityId}/create`}
              className="m-2 w-64 gap-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-400"
            >
              <div className="flex gap-4 p-4">
                <span className="flex items-center">
                  講義レビューを投稿する
                </span>
                <div>
                  <ArrowRightIcon className="size-8" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* スマホから閲覧した場合 */}
        <div className="block md:hidden">
          <div className="ml-5 flex justify-between">
            {/* パンクズリスト */}
            <section className="flex items-center">
              <Breadcrumb
                breadcrumbs={[
                  { label: '大学名検索', href: '/' },
                  {
                    label: '講義名検索',
                    href: `/universities/${params.id}`,
                    active: true,
                  },
                ]}
              />
            </section>
            {/* 講義レビュー投稿フォームへのリンク */}
            <Link
              href={`/universities/${universityId}/create`}
              className="m-4 size-[54px] rounded-2xl bg-blue-500 hover:bg-blue-400"
            >
              <div className="p-4">
                <PlusIcon className="flex size-6 items-center text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* 講義名入力欄, 学部選択メニュー, ソート選択メニュー */}
        <section className="flex justify-center px-7 pt-2">
          <ReviewSearch />
        </section>
      </div>

      {/* 講義名または学部名が入力または選択された場合 */}
      <section className="mt-4">
        {className || faculty ? (
          <Suspense fallback={<SearchReviewSkeleton />}>
            <ReviewsWrap searchParams={searchParams} />
          </Suspense>
        ) : (
          <p className="text-center text-xl">
            授業名または学部名を入力してください
          </p>
        )}
      </section>
    </main>
  );
}
