'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const queryClient = new QueryClient();

export default function UserPage({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <Box>
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
        </Box>
        <Typography variant="h6">{session?.data?.user?.name}</Typography>
      </Box>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

{
  /* <QueryClientProvider client={queryClient}>
<SelectFetchData userId="cm09v02280000oy1dsjqgztjz" />
</QueryClientProvider>
); */
}
