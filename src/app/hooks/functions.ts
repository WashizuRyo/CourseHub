import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function useSetQueryParams() {
  const [universityName, setUniversityName] = useState('');
  // pathnameを取得
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const onChangeHandler = useDebouncedCallback((term) => {
    // serchParamsを書き込み可能に
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('universityName', term); // queryにtermをセット
    } else {
      params.delete('universityName'); // 検索欄にすべて消されたらqueryを削除
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200); // 0.2秒キーが押されなかったらURLを書き換える

  return { universityName, setUniversityName, onChangeHandler };
}
