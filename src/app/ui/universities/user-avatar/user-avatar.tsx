'use client';

import Tooltip from '@/app/ui/universities/user-avatar/tooltip';
import { UserIcon } from '@heroicons/react/24/outline';
import type { Session } from 'next-auth';
import Image from 'next/image';
import { useState } from 'react';

export default function UserAvatar({ session }: { session: Session }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="relative"
    >
      {session ? (
        <Image
          src={session!.user!.image!}
          alt="user image"
          width={64}
          height={64}
          className="m-3 rounded-full"
        />
      ) : (
        <UserIcon className="m-3 size-[64px] rounded-full bg-gray-300 p-2" />
      )}
      {isVisible && <Tooltip session={session!} />}
    </div>
  );
}
