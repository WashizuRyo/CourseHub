import { StarIcon } from '@heroicons/react/24/solid'

export default function ReviewsSkeleton() {
  return (
    <div className='mx-4 p-2 md:m-auto md:w-7/12'>
      <div className='bg-gray-100 p-2'>
        <div className='p-1'>
          {/* ユーザ画像表示 */}
          <div className='rounded-md bg-white p-2'>
            <div className='animate-pulse'>
              <div className='flex items-center'>
                <div className='size-[64px] rounded-full bg-gray-200'></div>
                <div className='ml-2 h-3 w-[129px] rounded bg-gray-200'></div>
              </div>
              {/* スマホから閲覧した場合のレビュータイトル */}
              <div className='mb-1 mt-2 h-3 w-[129px] break-all rounded bg-gray-200 md:hidden'></div>
              {/* <div className="w-10 h-10 rounded-full bg-gray-200"></div> */}
              <div className='mt-2 flex items-center'>
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <div className='hidden md:ml-2 md:h-3 md:w-32 md:bg-gray-200'></div>
              </div>
              <div className='mt-2 h-2 w-[128px] rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='mb-3 mt-2 h-2 w-[200px] rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 px-2 pb-2'>
        <div className='p-1'>
          {/* ユーザ画像表示 */}
          <div className='rounded-md bg-white p-2'>
            <div className='animate-pulse'>
              <div className='flex items-center'>
                <div className='size-[64px] rounded-full bg-gray-200'></div>
                <div className='ml-2 h-3 w-[129px] rounded bg-gray-200'></div>
              </div>
              {/* スマホから閲覧した場合のレビュータイトル */}
              <div className='mb-1 mt-2 h-3 w-[129px] break-all rounded bg-gray-200 md:hidden'></div>
              {/* <div className="w-10 h-10 rounded-full bg-gray-200"></div> */}
              <div className='mt-2 flex items-center'>
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <StarIcon className='size-8 text-gray-200' />
                <div className='hidden md:ml-2 md:h-3 md:w-32 md:bg-gray-200'></div>
              </div>
              <div className='mt-2 h-2 w-[128px] rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='w-128 mt-2 h-2 rounded bg-gray-200'></div>
              <div className='mb-3 mt-2 h-2 w-[200px] rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
