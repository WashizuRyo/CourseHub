import type { ReviewsType } from '@/app/lib/definitions';
import { auth } from '@@/auth';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import NotFound from './not-found';

export default async function Reviews({
  query,
  reviewsWithClass,
  id,
}: {
  query: string;
  reviewsWithClass: ReviewsType;
  id: string;
}) {
  const session = await auth();
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {reviewsWithClass.length !== 0 ? (
        <div className="m-4 h-screen p-2">
          <div className="m-auto rounded-md bg-gray-100 p-2">
            {reviewsWithClass.map((review) => (
              <div key={review.id} className="p-1">
                <div className="rounded-md bg-white p-2">
                  {/* <div className="flex">
                    {review.isAnonymous ? (
                      <div className="flex">
                        <UserIcon className="size-[64px] rounded-full bg-gray-400 p-1 text-white" />
                        <p className="ml-2 flex items-center text-xl">匿名</p>
                      </div>
                    ) : (
                      // <>
                      //   <Image
                      //     src={review.user.image}
                      //     alt="user image"
                      //     width={64}
                      //     height={64}
                      //     className="rounded-full"
                      //   />
                      //   <span className="ml-2 flex items-center text-xl">
                      //     {review.user.username}
                      //   </span>
                      // </>
                    )}

                    <h2 className="flex items-center px-4 text-xl"></h2>
                  </div> */}
                  <div className="mb-2">
                    <div className="mt-2 flex">
                      {stars.map((element, value) => (
                        <div key={value}>
                          {value >= review.star ? (
                            <StarIcon className="size-8" />
                          ) : (
                            <StarIcon className="size-8 text-yellow-400" />
                          )}
                        </div>
                      ))}
                      <div className="ml-2 flex items-center">
                        <p className="text-xl">{review.title}</p>
                      </div>
                    </div>
                    <p className="text-gray-400">{review.date}にレビュー</p>
                    <p className="w-128">{review.evaluation}</p>
                  </div>
                  {session?.user?.email === review.createdBy ? (
                    <div className="mt-2 flex justify-end gap-1">
                      <div>
                        <Link href={`/university/${id}/edit/${review.id}`}>
                          <div className="rounded-md border p-2 shadow-sm hover:bg-gray-100">
                            <PencilSquareIcon className="size-5" />
                          </div>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href={`/university/${id}/delete/${review.id}?query=${query}`}
                        >
                          <div className="rounded-md border p-2 shadow-sm hover:bg-gray-100">
                            <TrashIcon className="size-5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NotFound query={query} />
      )}
    </div>
  );
}
