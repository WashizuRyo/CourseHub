'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const queryClient = new QueryClient();

export default function UserPage({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return (
    <>
      <div className="m-3 flex items-center">
        <div>
          {session?.data?.user?.image ? (
            <Image
              src={session.data.user.image}
              alt="user image"
              width={100}
              height={100}
              className="m-3 rounded-full"
            />
          ) : (
            <UserIcon className="m-3 size-[100px] rounded-full bg-gray-300 p-2" />
          )}
        </div>
        <h1 className="ml-3 break-all text-xl">{session?.data?.user?.name}</h1>
      </div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
