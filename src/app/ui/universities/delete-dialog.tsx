'use client';

import { deleteReview } from '@/app/lib/actions';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export default function DeleteDialog({
  universityId,
  evaluationId,
  query,
}: {
  universityId: number;
  evaluationId: number;
  query: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleShowModal = () => dialogRef.current?.showModal();
  const handleCloseModal = () => dialogRef.current?.close();
  const accessPath = usePathname();

  const deleteReviewByEvaluationId = deleteReview.bind(
    null,
    evaluationId,
    universityId,
    query,
    accessPath,
  );
  return (
    <>
      <button
        type="button"
        onClick={handleShowModal}
        className="rounded-md border border-red-400 p-2 shadow-sm hover:bg-gray-100"
      >
        <TrashIcon className="size-5 text-red-400" />
      </button>
      <dialog
        ref={dialogRef}
        className="h-6/12 md:h-4/2 w-9/12 rounded shadow-lg md:w-4/12"
      >
        <div className="mb-2 mt-4">
          <h1 className="px-2 text-xl leading-normal text-red-500">
            レビューを削除すると、元に戻すことはできません。本当に削除しますか？
          </h1>
        </div>
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={handleCloseModal}
            className="mr-2 rounded border border-green-400 p-2 hover:bg-gray-200"
          >
            <XMarkIcon className="size-6 text-green-400" />
          </button>
          <form action={deleteReviewByEvaluationId}>
            <button className="rounded border border-red-400 p-2 hover:bg-gray-200">
              <TrashIcon className="size-6 text-red-400" />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
