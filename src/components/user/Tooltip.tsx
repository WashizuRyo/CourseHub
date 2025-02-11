import { ArrowRightStartOnRectangleIcon, ArrowUpCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import type { Session } from 'next-auth'
import Link from 'next/link'
import SignIn from '../auth/SignInButton'
import SignOut from '../auth/SignOutButton'

export default function Tooltip({ session }: { session: Session | null }) {
  return (
    <>
      <div role='tooltip' className='absolute right-[15px] top-[78px] z-10 h-min w-[200px]' id='tooltip'>
        {session?.user ? (
          <div className='rounded bg-blue-200 text-gray-700'>
            <div className='flex justify-center p-4 hover:bg-blue-300'>
              <Link href={`/users/${session.user.id}/reviews`} className='w-full break-all text-center' id='username'>
                {session.user?.name}
              </Link>
            </div>
            <div className='text-md flex items-center gap-2 rounded p-4 hover:bg-blue-300'>
              <ArrowRightStartOnRectangleIcon className='size-7' />
              <SignOut />
            </div>
          </div>
        ) : (
          <div className='rounded bg-blue-200 text-center text-gray-700'>
            <div className='flex items-center pl-2'>
              <UserIcon className='m-3 size-[38px] rounded-full bg-gray-300 p-2' />
            </div>
            <div className='text-md flex size-full items-center gap-2 rounded p-2 hover:bg-blue-300'>
              <ArrowUpCircleIcon className='size-7' />
              <SignIn />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
