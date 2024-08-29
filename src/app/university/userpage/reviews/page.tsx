'use client';

import type { Review } from '@/app/lib/definitions';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Reviews() {
  const session = useSession();
  const userId = session?.data?.user?.id || '';
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(`http://localhost:3000/api/reviews/${userId}`).then((res) =>
        res.json(),
      ),
  });

  return (
    <>
      <div className="flex justify-center">
        <Box>
          <Button>reviews</Button>
        </Box>
        <Link href="/university/userpage/likes">
          <Button>LIKES</Button>
        </Link>
      </div>
      <Box sx={{ textAlign: 'center' }}>
        {data &&
          data.map((review: Review, i: number) => (
            <p key={i}>{review.title}</p>
          ))}
      </Box>
    </>
  );
}
