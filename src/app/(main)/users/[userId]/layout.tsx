'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

// クエリクライアントを生成
const queryClient = new QueryClient();

export default function UserPage({ children }: { children: React.ReactNode }) {
  // セッションを取得
  const { data: session } = useSession();
  return (
    <>
      <div className="m-3 flex items-center">
        <div>
          {session?.user?.image ? (
            <Image src={session.user.image} alt="user image" width={100} height={100} className="m-3 rounded-full" />
          ) : (
            <UserIcon className="m-3 size-[100px] rounded-full bg-gray-300 p-2" />
          )}
        </div>
        <h1 className="ml-3 break-all text-xl">{session?.user?.name}</h1>
      </div>
      {/* ./likes, reviews/page.tsxでuseQueryを使えるように */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
