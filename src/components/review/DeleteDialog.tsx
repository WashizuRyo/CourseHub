'use client'

import { deleteReview } from '@/entries/review'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'

export default function DeleteDialog({ reviewId }: { reviewId: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const handleShowModal = () => dialogRef.current?.showModal()
  const handleCloseModal = () => dialogRef.current?.close()

  const removeReview = deleteReview.bind(null, { reviewId })
  return (
    <>
      <div className='flex flex-col items-center'>
        <button
          type='button'
          onClick={handleShowModal}
          className='rounded-md border border-red-400 p-2 shadow-sm hover:bg-gray-100'
          data-testid='modalOpenButton'
        >
          <TrashIcon className='size-5 text-red-400' />
        </button>
      </div>
      <dialog ref={dialogRef} className='md:h-10/12 w-10/12 rounded shadow-lg md:w-10/12 '>
        <div className='mb-2 mt-4'>
          <h1 className='px-2 text-center text-xl leading-normal text-red-500'>
            レビューを削除すると、元に戻すことはできません。
            <br /> 本当に削除しますか？
          </h1>
        </div>
        <div>
          <div>
            <div className='mt-4 flex justify-center pb-4'>
              <button
                type='button'
                onClick={handleCloseModal}
                className='mr-2 rounded border border-green-400 p-2 hover:bg-gray-200'
              >
                <XMarkIcon className='size-6 text-green-400' />
              </button>
              <form action={removeReview}>
                <button className='rounded border border-red-400 p-2 hover:bg-gray-200' data-testid='deleteButton'>
                  <TrashIcon className='size-6 text-red-400' />
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
