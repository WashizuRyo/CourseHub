import ReviewTabs from '@/components/universities/userpage/review-selector'
import { auth } from '@@/auth'
import { UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default async function UserPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const session = await auth()
  return (
    <>
      <div className='m-3 flex items-center'>
        <div>
          {session?.user?.image ? (
            <Image src={session.user.image} alt='user image' width={100} height={100} className='m-3 rounded-full' />
          ) : (
            <UserIcon className='m-3 size-[100px] rounded-full bg-gray-300 p-2' />
          )}
        </div>
        <h1 className='ml-3 break-all text-xl'>{session?.user?.name}</h1>
      </div>
      <ReviewTabs userId={params.userId} />
      {children}
    </>
  )
}
