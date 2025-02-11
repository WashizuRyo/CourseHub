'use client'

import Tooltip from '@/components/user/Tooltip'
import { UserIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export default function SessionUserAvatar() {
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className='relative'
      id='user-avatar'
      role='tooltip'
    >
      {session?.user?.image ? (
        <Image src={session.user.image} alt='user image' width={64} height={64} className='m-3 rounded-full' />
      ) : (
        <UserIcon className='m-3 size-[64px] rounded-full bg-gray-300 p-2' />
      )}
      {isVisible && <Tooltip session={session} />}
    </div>
  )
}
