import Image from 'next/image'
import React from 'react'

const PicCard = () => {
  return (
    <div className='flex items-center gap-x-5'>
      <div className='h-full'>
        <div className='w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg bg-white cursor-pointer'>
          <div>求职面试</div>
          <div className='flex justify-end'>
            <Image
              src='https://static.leetcode.cn/cn-mono-assets/production/assets/interview.b8d34858.png'
              alt=''
              width={92}
              height={68}
            ></Image>
          </div>
        </div>
      </div>
      <div className='h-full'>
        <div
          className='w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg bg-white cursor-pointer'
          style={{
            background: 'linear-gradient(rgb(67, 212, 117), rgb(43, 213, 93))',
          }}
        >
          <div className='text-white'>职场与内推</div>
          <div className='flex justify-end'>
            <Image
              src='https://static.leetcode.cn/cn-mono-assets/production/assets/jobs-promote-active.3c936ab5.png'
              alt=''
              width={92}
              height={68}
            ></Image>
          </div>
        </div>
      </div>
      <div className='h-full'>
        <div className='w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg bg-white cursor-pointer'>
          <div>技术交流</div>
          <div className='flex justify-end'>
            <Image
              src='https://static.leetcode.cn/cn-mono-assets/production/assets/general-topic.66326b21.png'
              alt=''
              width={92}
              height={68}
            ></Image>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-3'>
        <div className='w-[176px] h-full pt-3 pl-4 flex justify-between rounded-lg bg-white cursor-pointer'>
          <div>学习分享</div>
          <Image
            src='https://static.leetcode.cn/cn-mono-assets/production/assets/notes.0e1effb1.png'
            alt=''
            width={36}
            height={36}
          ></Image>
        </div>
        <div className='w-[176px] h-full pt-3 pl-4 flex justify-between rounded-lg bg-white cursor-pointer'>
          <div>意见反馈</div>
          <Image
            src='https://static.leetcode.cn/cn-mono-assets/production/assets/feedback.6ed8deff.png'
            alt=''
            width={36}
            height={36}
          ></Image>
        </div>
      </div>
    </div>
  )
}

export default PicCard
