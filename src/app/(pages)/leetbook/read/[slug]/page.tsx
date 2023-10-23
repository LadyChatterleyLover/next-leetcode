'use client'
import ReadMenu from '@/app/components/read/readMenu'

const LeetBookRead = () => {
  return (
    <div className='flex'>
      <div className='w-[350px]'>
        <ReadMenu></ReadMenu>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default LeetBookRead
