import { notosans } from '@/components/fonts';
import '@/components/global.css';
import UniversitySearchBarSkeleton from '@/components/skeletons/university-search-bar-skeleton';
import UniversityLinkContainer from '@/components/universities/university-link';
import UniversitySearchBar from '@/components/university-search-bar';
import { Suspense } from 'react';
export default async function Page({
  searchParams,
}: {
  searchParams: {
    universityName: string;
  };
}) {
  const { universityName } = searchParams;

  return (
    <main>
      <section className="mt-6 flex flex-col items-center p-4">
        <div>
          <h1
            className={`${notosans.className} inline-block whitespace-pre-line
          bg-gradient-to-r from-sky-600 to-violet-700
          bg-clip-text text-4xl font-semibold leading-[55px] tracking-widest text-transparent
          `}
          >
            講義選びを
            <br />
            もっと賢く
            <br />
            もっと確実に。
          </h1>
        </div>
        <div>
          <p className={`${notosans.className} mt-4 max-w-3xl font-medium leading-10 text-gray-500`}>
            このアプリは、学生が講義の評価を共有し、講義選びをサポートするコミュニティです。受講済みの講義を評価し、
            他の学生と情報を交換することで、大学生活をより充実させましょう。最新の講義情報をチェックして、賢い選択をしましょう。
          </p>
        </div>
      </section>

      {/* 大学名検索欄 */}
      <section className="mb-12 h-96 p-7">
        <div className="flex justify-center">
          <UniversitySearchBar />
        </div>
        <div className="mt-6 text-center">
          {/* 大学名が入力された場合 */}
          {universityName ? (
            <Suspense fallback={<UniversitySearchBarSkeleton />}>
              <UniversityLinkContainer universityName={universityName} />
            </Suspense>
          ) : (
            // 大学名が入力されていない場合
            <p className={`${notosans.className} text-xl text-gray-500`}>
              大学名を入力してください(Aichiと入力してください)
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
