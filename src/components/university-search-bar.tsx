'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function UniversitySearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleChange(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('universityName', term);
    } else {
      params.delete('universityName');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="m-2 flex h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 sm:w-[430px]">
      <div className="flex items-center rounded-l-2xl  ">
        <MagnifyingGlassIcon className="size-7" />
      </div>
      <div className="flex w-full items-center">
        <input
          type="search"
          id="search"
          placeholder="大学名を入力"
          className="text-bold w-full rounded-r-2xl bg-gray-100 p-2 focus:outline-none"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          defaultValue={searchParams.get('universityName')?.toString()}
        />
      </div>
    </div>
  );
}
