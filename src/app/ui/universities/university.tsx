import { fetchUniversity } from '@/app/lib/data';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NotFound from './not-found';

export default async function University({ query }: { query: string }) {
  const university = await fetchUniversity(query);
  return (
    <div>
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
        <NotFound query={query} />
      )}
    </div>
  );
}
