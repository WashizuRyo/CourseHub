import { fetchUniversityByName } from '@/app/lib/data';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NotFound from './not-found';

export default async function UniversityLink({
  universityName,
}: {
  universityName: string;
}) {
  const university = await fetchUniversityByName(universityName);

  return (
    <div>
      {/* 大学が見つかった場合はリンクを表示 */}
      {university ? (
        <div className="flex justify-center">
          <div className="flex w-[200px] justify-start rounded-xl border bg-blue-500 p-2 shadow-md hover:bg-blue-400">
            <Link
              href={`/university/${university?.universityId}`}
              className="flex items-center"
            >
              <BuildingLibraryIcon className="mr-2 size-12 text-white" />
              <p className="mt-1 text-2xl text-white">
                {university?.universityname}
              </p>
            </Link>
          </div>
        </div>
      ) : (
        // 見つからなかった場合
        <NotFound universityName={universityName} />
      )}
    </div>
  );
}
