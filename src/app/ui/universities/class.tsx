'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchClass({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div className="flex h-[56px] w-[430px] rounded-2xl border bg-gray-100 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <div className="flex items-center rounded-l-2xl  p-2 ">
        <MagnifyingGlassIcon className="size-7" />
      </div>
      <div className="flex w-full items-center">
        <input
          type="search"
          id="search"
          placeholder={placeholder}
          className="text-bold w-full overflow-x-auto rounded-r-2xl bg-gray-100 p-2 focus:outline-none"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </div>
  );
}
