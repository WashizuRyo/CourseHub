'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterAndSortPanel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

    replace(`${pathname}?${params.toString()}`);
  };

  return (
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
            onChange={(e) => handleChangeFaculty(e)}
          >
            <option value="">学部を選んでください</option>
            <option value="science">理学部</option>
            <option value="engineering">工学部</option>
            <option value="humanities">文学部</option>
            <option value="economics">経済部</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <label htmlFor="sort">　並び替え ： </label>
        <select id="sort" onChange={(e) => handleSort(e)}>
          <option value="">並び順を選んでください</option>
          <option value="desc">新しい順</option>
          <option value="asc">古い順</option>
        </select>
      </div>
    </div>
  );
}
