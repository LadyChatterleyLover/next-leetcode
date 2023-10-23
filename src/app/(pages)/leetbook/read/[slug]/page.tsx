'use client'

import ReadContent from '@/app/components/read/ReadContent'
import ReadMenu from '@/app/components/read/ReadMenu'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const LeetBookRead = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const title = useMemo(() => {
    return searchParams.get('title')
  }, [searchParams])
  return (
    <div>
      <div
        className='px-4 bg-white flex items-center h-12 hover:text-[#0a84ff] z-10 cursor-pointer'
        style={{ boxShadow: '0 1px 5px rgba(0,0,0, 0.1)' }}
        onClick={() => {
          router.back()
        }}
      >
        返回 {title}
      </div>
      <div className='flex pt-[2px]'>
        <div className='w-[350px]'>
          <ReadMenu></ReadMenu>
        </div>
        <div className='flex-1 p-[80px]'>
          <ReadContent></ReadContent>
        </div>
      </div>
    </div>
  )
}

export default LeetBookRead
