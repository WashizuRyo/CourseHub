import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// universityNameクエリをセットするフック
export function useSetQueryParam() {
  const [universityName, setUniversityName] = useState('');
  // pathnameを取得
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const onChangeHandler = useDebouncedCallback((term) => {
    // serchParamsを書き込み可能に
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('universityName', term); // universityNameにtermをセット
    } else {
      params.delete('universityName'); // 検索欄がすべて消されたらuniversityNameを削除
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200); // 0.2秒キーが押されなかったらURLを書き換える

  return { universityName, setUniversityName, onChangeHandler };
}
