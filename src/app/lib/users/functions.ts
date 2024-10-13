import { DEFAULT_PAGE } from '@/app/lib/constants';
import { useSearchParams } from 'next/navigation';

export function useGetQueryParams(query: string) {
  // 引数queryで指定したクエリパラメータを取得
  const searchParams = useSearchParams();
  const currentPage = searchParams.get(query) || DEFAULT_PAGE;

  return { currentPage };
}
