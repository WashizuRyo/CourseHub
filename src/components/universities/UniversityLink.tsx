import UniversitySearchBarSkeleton from '@/components/skeletons/UniversitySearchBarSkeleton'
import { fetchUniversityByName } from '@/model/university'
import { BuildingLibraryIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Suspense } from 'react'
import NotFound from '../utils/NotFound'

export default async function UniversityLink({ universityName }: { universityName: string }) {
  return (
    <Suspense key={universityName} fallback={<UniversitySearchBarSkeleton />}>
      <UniversityFetcher universityName={universityName} />
    </Suspense>
  )
}

async function UniversityFetcher({ universityName }: { universityName: string }) {
  const university = await fetchUniversityByName(universityName)
  if (!university) {
    return <NotFound query={universityName} />
  }

  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex justify-start rounded-xl border bg-blue-500 shadow-md hover:bg-blue-400'>
          <Link href={`/universities/${university?.universityId}`} className='flex items-center'>
            <div className='flex w-[180px] items-center p-2'>
              <BuildingLibraryIcon className='ml-4 mr-1 size-12 text-white' />
              <p className='text-2xl text-white'>{university?.universityname}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
