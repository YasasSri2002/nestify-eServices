'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DynamicIcon from './DynamicIcons'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  endPage: number
  perPageNumber: string
  routerPath: string
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    endPage,
    perPageNumber,
    routerPath
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? perPageNumber
  
  const basePath = routerPath.startsWith('/') ? routerPath : `/${routerPath}`
  const cleanPath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath

  const totalPages = Math.max(1, Math.ceil(endPage / Number(per_page)))

  const createPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(targetPage));
    params.set('per_page', per_page);
    return `${cleanPath.split('?')[0]}?${params.toString()}`;
  };

  return (
    <div className='flex items-center gap-3 select-none'>
      <button
        className='bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white p-2.5 transition-all active:scale-95 shadow-sm'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(createPageUrl(Math.max(1, Number(page) - 1)))
        }}>
        <DynamicIcon name="FaChevronLeft" className='w-4 h-4'></DynamicIcon>
      </button>

      <div className='text-sm font-medium text-slate-700 px-3 py-1 bg-slate-100 rounded-lg'>
        Page {page} of {totalPages}
      </div>

      <button
        className='bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white p-2.5 transition-all active:scale-95 shadow-sm'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(createPageUrl(Number(page) + 1))
        }}>
        <DynamicIcon name="FaChevronRight" className='w-4 h-4'></DynamicIcon>
      </button>
    </div>
  )
}

export default PaginationControls