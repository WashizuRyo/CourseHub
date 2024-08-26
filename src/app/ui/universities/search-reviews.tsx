import type { Review } from '@/app/lib/definitions';
import Pagenation from '@/app/ui/pagenation';
import DeleteDialog from '@/app/ui/universities/delete-dialog';
import { auth } from '@@/auth';
import { PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import NotFound from './not-found';

export default async function Reviews({
  query,
  faculty,
  reviewsWithClass,
  id,
  totalPage,
}: {
  query: string;
  faculty: string;
  reviewsWithClass: Review[];
  id: string;
  totalPage: number;
}) {
  const session = await auth();
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {reviewsWithClass.length === 0 ? (
        <NotFound query={query} faculty={faculty} />
      ) : (
        <div className="m-4 p-2 md:m-auto md:w-7/12">
          <div className="rounded-md bg-gray-100 p-2">
            {reviewsWithClass.map((review) => (
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
                          {review.user.name!}
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
                    <p className="my-1 text-gray-400">
                      {review.date}にレビュー
                    </p>

                    {/* レビュー内容 */}
                    <p className="w-128 whitespace-break-spaces leading-7">
                      {review.evaluation}
                    </p>
                  </div>

                  {/* 編集と削除ページ */}
                  {session?.user?.id === review.createdBy && (
                    <div className="mt-6 flex justify-end gap-1">
                      <div className="flex flex-col items-center">
                        <Link href={`/university/${id}/edit/${review.id}`}>
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
            ))}
          </div>
          <div className="mt-6 text-center">
            <Pagenation totalPage={totalPage} />
          </div>
        </div>
      )}
    </div>
  );
}
