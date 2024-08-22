import '@/app/ui/global.css';
import SearchUniversitySkeleton from '@/app/ui/skeletons/search-university-skelton';
import {
  RocketLaunchIcon,
  SunIcon,
  UnderlineIcon,
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
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

  const popularUniversity = [
    {
      name: 'RocketUniversity',
      icon: <RocketLaunchIcon className="size-[100px] text-red-200" />,
      link: '/university/2',
    },
    {
      name: 'StarUniversity',
      icon: <SparklesIcon className="size-[100px] text-yellow-200" />,
      link: '/university/3',
    },
    {
      name: 'UnderlineUniversity',
      icon: <UnderlineIcon className="size-[100px] text-blue-200" />,
      link: '/university/4',
    },
    {
      name: 'SunUniversity',
      icon: <SunIcon className="size-[100px] text-orange-200" />,
      link: '/university/5',
    },
  ];
  return (
    <div className="relative">
      <div className=" p-7">
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
      <div className="buttom-0 absolute inset-x-0 top-[256px] m-6 mx-auto rounded-lg border p-2 shadow-sm">
        <div className="flex justify-center">
          <div className=" w-[400px] rounded-lg p-2 text-center">
            <p className=" text-2xl font-bold text-gray-900">
              検索された回数が多い大学
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-[64px] pb-4 text-center md:flex-row md:justify-center">
          {popularUniversity.map((e) => {
            return (
              <div key={e.name} className="">
                <Link
                  href={e.link}
                  className="flex flex-col items-center text-gray-600"
                >
                  {e.icon}
                  {e.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
