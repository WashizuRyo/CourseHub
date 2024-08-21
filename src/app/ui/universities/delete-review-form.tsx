import { deleteReview } from '@/app/lib/actions';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DeleteReviewForm({
  evaluationId,
  id,
  searchParams,
}: {
  evaluationId: string;
  id: string;
  searchParams?: {
    query?: string;
  };
}) {
  const deleteReviewWithEvaluationId = deleteReview.bind(
    null,
    parseInt(evaluationId),
    parseInt(id),
    searchParams?.query,
  );
  return (
    <div className="flex justify-center">
      <form action={deleteReviewWithEvaluationId}>
        <div className="rounded border bg-gray-100 p-8 shadow-xl">
          <div className="flex flex-col items-center gap-2">
            <p>本当にレビューを削除しますか？</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="">
                <Link
                  href={`/university/${id}?query=${searchParams?.query}`}
                  className=""
                >
                  <div className="rounded border p-2 hover:bg-gray-200">
                    <XMarkIcon className="size-6" />
                  </div>
                </Link>
              </div>
              <button
                type="submit"
                className="rounded border p-2 hover:bg-gray-200"
              >
                <TrashIcon className=" size-6" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
