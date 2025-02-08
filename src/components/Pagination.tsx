'use client'

import { getTotalPage } from '@/lib/functions'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ hitCount }: { hitCount: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || 1

  const totalPage = getTotalPage(hitCount)

  const createURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='flex justify-center gap-3'>
      {currentPage == 1 && totalPage == 1 && (
        <>
          <ArrowLeftIcon className='size-9 rounded border border-gray-300 p-1 text-gray-300' />
          <PagenationNumber currentPage={currentPage} totalPage={totalPage} createURL={createURL} />
          <ArrowRightIcon className='size-9 rounded border border-gray-300 p-1 text-gray-300' />
        </>
      )}

      {/* 現在のページが１の時のページネーションのUI */}
      {currentPage == 1 && totalPage != 1 && (
        <>
          <ArrowLeftIcon className='size-9 rounded border border-gray-300 p-1 text-gray-300' />
          <PagenationNumber currentPage={currentPage} totalPage={totalPage} createURL={createURL} />
          <Link href={createURL(currentPage + 1)}>
            <ArrowRightIcon className='size-9 rounded border border-gray-200 p-1 text-black' />
          </Link>
        </>
      )}

      {/* 現在のページが1より大きい、かつ、トータルページ未満のときのページネーションUI */}
      {currentPage > 1 && currentPage < totalPage && (
        <>
          <Link href={createURL(currentPage - 1)}>
            <ArrowLeftIcon className='size-9 rounded border border-gray-200 p-1' />
          </Link>
          <PagenationNumber currentPage={currentPage} totalPage={totalPage} createURL={createURL} />
          <Link href={createURL(currentPage + 1)}>
            <ArrowRightIcon className='size-9 rounded border border-gray-200 p-1' />
          </Link>
        </>
      )}

      {/* 現在のページがトータルページのときのページネーションUI */}
      {currentPage == totalPage && totalPage != 1 && (
        <>
          <Link href={createURL(currentPage - 1)}>
            <ArrowLeftIcon className='size-9 rounded border border-gray-200 p-1 text-black' />
          </Link>
          <PagenationNumber currentPage={currentPage} totalPage={totalPage} createURL={createURL} />
          <ArrowRightIcon className='size-9 rounded border border-gray-300 p-1 text-gray-300' />
        </>
      )}
    </div>
  )
}

function PagenationNumber({
  currentPage,
  totalPage,
  createURL,
}: {
  currentPage: number
  totalPage: number
  createURL: (pageNumber: number) => string
}) {
  const pagenationNumber = Array.from({ length: totalPage }, (_, index) => index + 1)

  return (
    <div className='flex items-center gap-2'>
      {pagenationNumber.map((e, index) => (
        <Link
          href={createURL(e)}
          key={index}
          className={clsx(
            'flex size-9 flex-col justify-center rounded border',
            currentPage == e && 'border border-blue-500 text-blue-500',
          )}
        >
          {e}
        </Link>
      ))}
    </div>
  )
}
