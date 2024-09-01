'use client';

import type { Review } from '@/app/lib/definitions';
import Pagenation from '@/app/ui/pagenation';
import SearchReviewSkeleton from '@/app/ui/skeletons/search-review-skeleton';
import DeleteDialog from '@/app/ui/universities/delete-dialog';
import { PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Likes() {
  const session = useSession();
  const userId = session?.data?.user?.id || '';
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const { data, isLoading } = useQuery({
    queryKey: ['likes', currentPage],
    queryFn: () =>
      fetch(`http://localhost:3000/api/likes/${userId}/${currentPage}`).then(
        (res) => res.json(),
      ),
  });

  const { data: data1, isLoading: isLoading1 } = useQuery({
    queryKey: ['totalPage'],
    queryFn: () =>
      fetch(`http://localhost:3000/api/likes/${userId}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading || isLoading1)
    return (
      <>
        <div className="flex justify-center">
          <Button>reviews</Button>
          <Button>likes</Button>
        </div>
        <SearchReviewSkeleton />
      </>
    );

  //一回のレビュー表示数
  const pageSize = 2;
  //総ページ数
  const totalPage =
    data1 % pageSize == 0 ? data1 / pageSize : data1 / pageSize + 1;
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/university/userpage/reviews">
          <Button>reviews</Button>
        </Link>
        <Button>likes</Button>
      </Box>
      <div className="m-4 p-2 md:m-auto md:w-7/12">
        <div className="rounded-md bg-gray-100 p-2">
          {data.map((review: Review) => (
            <div key={review.id} className="p-1">
              {/* ユーザ画像表示 */}
              <div className="rounded-md bg-white p-2">
                <div className="flex">
                  {review.isAnonymous ? (
                    <div className="flex">
                      <UserIcon className="size-[64px] rounded-full bg-gray-400 p-1 text-white" />
                      <p className="ml-2 flex items-center text-xl">匿名</p>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={review.user.image!}
                        alt="user image"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <span className="ml-2 flex items-center break-all text-xl">
                        {review.user.name}
                      </span>
                    </>
                  )}
                </div>

                {/* 学部名 */}
                <div className="mt-3">{review.faculty}</div>

                {/* 授業名 */}
                <div className="mt-2 text-xl">{review.className}</div>

                {/* スマホから閲覧した場合のレビュータイトル */}
                <div className="mb-1 mt-2 break-all md:hidden">
                  <p className="text-xl">{review.title}</p>
                </div>

                <div className="mb-2">
                  <div className="flex">
                    {/* 星の数 */}
                    {stars.map((element, value) => (
                      <div key={value}>
                        {value >= review.star ? (
                          <StarIcon className="size-8" />
                        ) : (
                          <StarIcon className="size-8 text-yellow-400" />
                        )}
                      </div>
                    ))}

                    {/* パソコンから閲覧した場合のレビュータイトル */}
                    <div className="hidden md:ml-2 md:flex md:items-center">
                      <p className="text-2xl">{review.title}</p>
                    </div>
                  </div>

                  {/* レビューした日 */}
                  <p className="my-1 text-gray-400">{review.date}にレビュー</p>

                  {/* レビュー内容 */}
                  <p className="w-128 whitespace-break-spaces leading-7">
                    {review.evaluation}
                  </p>
                </div>

                <div className="flex justify-end">
                  {/* 編集と削除ページ */}
                  {session.data?.user?.id === review.createdBy && (
                    <div className="mt-6 flex justify-end gap-1">
                      <div className="flex flex-col items-center">
                        <Link
                          href={`/university/${review.universityId}/edit/${review.id}`}
                        >
                          <div className="rounded-md border border-green-400 p-2 shadow-sm hover:bg-gray-100">
                            <PencilSquareIcon className="size-5 text-green-400" />
                          </div>
                        </Link>
                        <p className="mt-1 text-sm">編集</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <DeleteDialog
                          universityId={review.universityId}
                          evaluationId={review.id}
                          query={review.className}
                        />
                        <p className="mt-1 text-sm">削除</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 text-center">
            <Pagenation totalPage={totalPage} />
          </div>
        </div>
      </div>
    </>
  );
}
