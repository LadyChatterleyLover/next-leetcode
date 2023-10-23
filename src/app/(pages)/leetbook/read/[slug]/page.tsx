'use client'

import ReadContent from '@/app/components/read/ReadContent'
import ReadMenu from '@/app/components/read/ReadMenu'

const LeetBookRead = () => {
  return (
    <div className='flex'>
      <div className='w-[350px]'>
        <ReadMenu></ReadMenu>
      </div>
      <div className='flex-1 p-[80px]'>
        <ReadContent></ReadContent>
      </div>
    </div>
  )
}

export default LeetBookRead
