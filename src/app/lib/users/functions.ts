import { DEFAULT_PAGE, PAGE_SIZE } from '@/app/lib/constants';
import { useSearchParams } from 'next/navigation';

export function useGetQueryParams(query: string) {
  // 引数queryで指定したクエリパラメータを取得
  const searchParams = useSearchParams();
  const currentPage = searchParams.get(query) || DEFAULT_PAGE;

  return { currentPage };
}

export function getTotalPage(pageCount: number) {
  //　PAZE_SIZEで割り切れる場合と割り切れない場合でページ数を変更
  return pageCount % PAGE_SIZE === 0
    ? pageCount / PAGE_SIZE
    : Math.floor(pageCount / PAGE_SIZE) + 1;
}
