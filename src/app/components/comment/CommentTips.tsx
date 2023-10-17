import { useState } from 'react'

const CommentTips = () => {
  const [flag, setFlag] = useState(true)
  return (
    flag && (
      <div className='mt-3'>
        <div className='w-full rounded-[13px] border p-4 bg-[#000a2008]  border-[#00000008] mb-3'>
          <div className='flex w-full flex-col items-start gap-3'>
            <div className='flex w-full items-center justify-between'>
              <div className='font-medium text-label-1 dark:text-dark-label-1'>💡 讨论区规则</div>
              <div className='cursor-pointer' onClick={() => setFlag(false)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  className='h-4 w-4 text-gray-6 dark:text-dark-gray-6 hover:text-gray-7 dark:hover:text-dark-gray-7'
                >
                  <path
                    fillRule='evenodd'
                    d='M13.414 12L19 17.586A1 1 0 0117.586 19L12 13.414 6.414 19A1 1 0 015 17.586L10.586 12 5 6.414A1 1 0 116.414 5L12 10.586 17.586 5A1 1 0 1119 6.414L13.414 12z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
            </div>
            <div className='flex w-full flex-col items-start gap-4 text-xs text-label-2 dark:text-dark-label-2'>
              <p>1. 请不要在评论区发表题解！</p>
              <p>2. 评论区可以发表关于对翻译的建议、对题目的疑问及其延伸讨论。</p>
              <p>3. 如果你需要整理题解思路，获得反馈从而进阶提升，可以去题解区进行。</p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default CommentTips
