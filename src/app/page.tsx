import { notosans } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import SearchUniversitySkeleton from '@/app/ui/skeletons/search-university-skelton';
import { Suspense } from 'react';
import SearchClass from './ui/universities/class';
import University from './ui/universities/university';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div>
      <div className="mt-6 flex flex-col items-center p-4">
        <div>
          <h1
            className={`${notosans.className} inline-block whitespace-pre-line
          bg-gradient-to-r from-sky-600 to-violet-700
          bg-clip-text text-4xl font-semibold leading-[55px] tracking-widest text-transparent
          `}
          >
            講義選びを、
            <br />
            もっと賢く、
            <br />
            もっと確実に。
          </h1>
        </div>
        <div>
          <p
            className={`${notosans.className} mt-4 max-w-3xl font-medium leading-10 text-gray-500`}
          >
            このアプリは、学生が講義の評価を共有し、講義選びをサポートするコミュニティです。受講済みの講義を評価し、
            他の学生と情報を交換することで、大学生活をより充実させましょう。最新の講義情報をチェックして、賢い選択をしましょう。
          </p>
        </div>
      </div>
      <div className="mb-12 h-96 p-7">
        <div className="flex justify-center">
          <SearchClass placeholder="大学名を入力" />
        </div>
        <div className="mt-6 text-center">
          {query ? (
            <Suspense fallback={<SearchUniversitySkeleton />}>
              <University query={query} />
            </Suspense>
          ) : (
            <p className="text-xl">大学名を入力してください</p>
          )}
        </div>
      </div>
    </div>
  );
}
