'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchClass({
  placeholder,
  isUniversitySearchBar,
}: {
  placeholder: string;
  isUniversitySearchBar: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [intputValue, setInputValue] = useState('');
  const [facultyValue, setFacultyValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const className = searchParams.get('query');

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    params.set('page', '1');
    params.delete('sort');
    params.delete('faculty');

    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeFaculty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('faculty', e.target.value);
    params.set('page', '1');
    params.delete('query');
    setInputValue('');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4 text-center text-xl">
        {!isUniversitySearchBar && <label htmlFor="search">授業名で検索</label>}
      </div>
      <div className="m-2 flex h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 sm:w-[430px]">
        <div className="flex items-center rounded-l-2xl  ">
          <MagnifyingGlassIcon className="size-7" />
        </div>
        <div className="flex w-full items-center">
          <input
            type="search"
            id="search"
            placeholder={placeholder}
            className="text-bold w-full rounded-r-2xl bg-gray-100 p-2 focus:outline-none"
            onChange={(e) => {
              setSortValue('');
              setFacultyValue('');
              setInputValue(e.target.value);
              handleSearch(e.target.value);
            }}
            value={intputValue || className || ''}
          />
        </div>
      </div>

      {/* 大学名検索の場合は表示しない */}
      {isUniversitySearchBar ? (
        ' '
      ) : (
        <div className="flex flex-col">
          <div className="my-4 flex flex-col text-center">
            <label htmlFor="faculty" className="text-xl">
              学部で検索
            </label>
            <div className="mx-3 mt-3">
              <select
                id="faculty"
                name="faculty"
                className="text-bold mt-2 h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 text-center shadow-sm sm:w-[430px]"
                onChange={(e) => {
                  setSortValue('');
                  setFacultyValue(e.target.value);
                  handleChangeFaculty(e);
                }}
                value={facultyValue}
              >
                <option value="">学部を選んでください</option>
                <option value="理学部">理学部</option>
                <option value="工学部">工学部</option>
                <option value="文学部">文学部</option>
                <option value="経済部">経済部</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <label htmlFor="sort">　並び替え ： </label>
            <select
              id="sort"
              onChange={(e) => {
                setSortValue(e.target.value);
                handleSort(e);
              }}
              value={sortValue}
            >
              <option value="">並び順を選んでください</option>
              <option value="desc">新しい順</option>
              <option value="asc">古い順</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
