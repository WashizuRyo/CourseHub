'use client';

import { fetchLikes } from '@/app/lib/actions';
import { HeartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Likes({
  reviewId,
  isLiked,
}: {
  reviewId: number;
  isLiked: boolean;
}) {
  const session = useSession();
  const [state, setState] = useState(isLiked);
  const userId = session?.data?.user?.id || '';

  const createLikesWithReviewIdAndUserId = fetchLikes.bind(
    null,
    reviewId,
    userId,
    state,
  );
  const handleClick = () => {
    setState(!state);
  };

  return (
    <form action={createLikesWithReviewIdAndUserId} className="size-[38px]">
      <button type="submit" onClick={handleClick}>
        <HeartIcon
          className={clsx('size-10', state ? 'text-red-500' : 'text-gray-500')}
        />
      </button>
    </form>
  );
}
