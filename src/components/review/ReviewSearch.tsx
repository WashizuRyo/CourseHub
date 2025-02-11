'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ReviewSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [className, setClassName] = useState('')
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const handleChangeSort = (term: string) => {
    params.set('sort', term)
    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }

  const handleChange = ({ term, param, callback }: { term: string; param: string; callback: () => void }) => {
    if (term) {
      params.set(`${param}`, `${term}`)
      params.set('page', '1')
    } else {
      params.delete(param, term)
      params.delete('page', '1')
    }

    callback()
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <section className='flex justify-center px-7 pt-2'>
      <div>
        <div className='mb-4 text-center text-xl'>
          <label htmlFor='search'>講義名で検索</label>
        </div>
        <div className='m-2 flex h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 sm:w-[430px]'>
          <div className='flex items-center rounded-l-2xl  '>
            <MagnifyingGlassIcon className='size-7' />
          </div>
          <div className='flex w-full items-center'>
            <input
              type='search'
              id='search'
              placeholder='講義名を入力'
              className='text-bold w-full rounded-r-2xl bg-gray-100 p-2 focus:outline-none'
              onChange={(e) => {
                handleChange({ term: e.target.value, param: 'className', callback: () => params.delete('faculty') })
                setClassName(e.target.value)
              }}
              value={className}
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='my-4 flex flex-col text-center'>
            <label htmlFor='faculty' className='text-xl'>
              学部で検索
            </label>
            <div className='mx-3 mt-3'>
              <select
                id='faculty'
                name='faculty'
                className='text-bold mt-2 h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 text-center shadow-sm sm:w-[430px]'
                onChange={(e) => {
                  handleChange({
                    term: e.target.value,
                    param: 'faculty',
                    callback: () => {
                      setClassName('')
                      params.delete('className')
                    },
                  })
                }}
                value={searchParams.get('faculty')?.toString() || ''}
              >
                <option value=''>学部を選んでください</option>
                <option value='理学部'>理学部</option>
                <option value='工学部'>工学部</option>
                <option value='文学部'>文学部</option>
                <option value='経済部'>経済部</option>
              </select>
            </div>
          </div>

          <div className='text-center'>
            <label htmlFor='sort'> 並び替え : </label>
            <select
              id='sort'
              onChange={(e) => {
                handleChangeSort(e.target.value)
              }}
              value={searchParams.get('sort')?.toString() || ''}
            >
              <option value=''>並び順を選んでください</option>
              <option value='desc'>新しい順</option>
              <option value='asc'>古い順</option>
            </select>
          </div>
        </div>

        {searchParams.toString() === '' && (
          <p className='mt-6 text-center text-xl'>授業名または学部名を入力してください</p>
        )}
      </div>
    </section>
  )
}
