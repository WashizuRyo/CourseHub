import { fetchUniversityByName } from '@/app/lib/data';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NotFound from './not-found';

export default async function UniversityLinkContainer({ universityName }: { universityName: string }) {
  // 大学が存在するかチェック
  const university = await fetchUniversityByName(universityName);

  if (!university) {
    return <NotFound query={universityName} />;
  }

  return <UniversityLinkPresentation university={university} />;
}

function UniversityLinkPresentation({ university }: { university: { universityId: number; universityname: string } }) {
  return (
    <div>
      {/* 大学が見つかった場合はリンクを表示 */}
      <div className="flex justify-center">
        <div className="flex justify-start rounded-xl border bg-blue-500 shadow-md hover:bg-blue-400">
          <Link href={`/universities/${university?.universityId}`} className="flex items-center">
            <div className="flex w-[180px] items-center p-2">
              <BuildingLibraryIcon className="ml-4 mr-1 size-12 text-white" />
              <p className="text-2xl text-white">{university?.universityname}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
