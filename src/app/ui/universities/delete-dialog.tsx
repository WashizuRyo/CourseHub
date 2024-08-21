'use client';

import { deleteReview } from '@/app/lib/actions';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export default function Dialog({
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

  const deleteReviewByEvaluationId = deleteReview.bind(
    null,
    evaluationId,
    universityId,
    query,
  );
  return (
    <>
      <button
        type="button"
        onClick={handleShowModal}
        className="rounded-md border p-2 shadow-sm hover:bg-gray-100"
      >
        <TrashIcon className="size-5" />
      </button>
      <dialog ref={dialogRef} className="h-1/5 w-1/6 rounded shadow-md">
        <div className="mb-2 mt-10">
          <h1 className="text-center text-xl text-red-400">
            本当に削除しますか
          </h1>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCloseModal}
            className="mr-2 rounded border  p-2 hover:bg-gray-200"
          >
            <XMarkIcon className="size-6" />
          </button>
          <form action={deleteReviewByEvaluationId}>
            <button className="rounded border p-2 hover:bg-gray-200">
              <TrashIcon className="size-6" />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
