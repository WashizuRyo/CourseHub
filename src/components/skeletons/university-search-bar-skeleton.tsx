export default function UniversitySearchBarSkeleton() {
  return (
    <div className='flex justify-center'>
      <div className='flex h-[64px] w-[180px] justify-start rounded-xl border bg-blue-500 p-2 shadow-md'>
        <div className='flex animate-pulse items-center'>
          <div className='ml-4 mr-1 size-10 rounded-full bg-white'></div>
          <div className='ml-2 h-3 w-[80px] rounded bg-white'></div>
        </div>
      </div>
    </div>
  )
}
