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

// className, faculty, sort, page クエリをセットするフック
export function useSetQueryParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [className, setClassName] = useState('');
  const [facultyValue, setFacultyValue] = useState('');
  const [sortValue, setSortValue] = useState('');

  const changeClassNameHandler = useDebouncedCallback((term: string) => {
    // クエリパラメータを書き換え可能に
    const params = new URLSearchParams(searchParams);
    if (term) {
      // 講義名が入力されたらclassnameとpageを設定
      params.set('classname', term);
      params.set('page', '1');
    } else {
      // 講義名が空のときはclassnameとpageを削除
      params.delete('classname');
      params.delete('page');
    }

    // 講義名と学部名で複合させてデータを取得できないので講義名が設定されたら、facultyを削除
    params.delete('faculty');
    // 学部検索欄を空にする
    setFacultyValue('');

    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const changeSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ソートを選択された値でセット
    setSortValue(e.target.value);

    // クエリパラメータを書き換え可能に
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    // sortが変更されたらpageを1に
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };

  const changeFacultyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 学部名を選択された値でセット
    setFacultyValue(e.target.value);

    // クエリパラメータを書き換え可能に
    const params = new URLSearchParams(searchParams);
    // faculty, pageをセット
    params.set('faculty', e.target.value);
    params.set('page', '1');

    // 講義名と学部名で複合させてデータを取得できないので学部名が設定されたら、classnameを削除
    params.delete('classname');
    // 講義検索欄を空にする
    setClassName('');

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    className,
    facultyValue,
    sortValue,
    setClassName,
    changeClassNameHandler,
    changeFacultyHandler,
    changeSortHandler,
  };
}
