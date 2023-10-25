import { useReactive } from 'ahooks'
import Image from 'next/image'

interface Props {
  setSlug: (val: string) => void
}

const PicCard: React.FC<Props> = ({ setSlug }) => {
  const state = useReactive<{
    slug: string
  }>({
    slug: 'interview',
  })
  return (
    <div className='flex items-center gap-x-5'>
      <div className='h-full'>
        <div
          className={`w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg cursor-pointer ${
            state.slug === 'interview' ? 'text-white' : ''
          }`}
          style={{
            background: state.slug === 'interview' ? 'linear-gradient(rgb(56, 151, 255), rgb(0, 122, 255))' : '#fff',
          }}
          onClick={() => {
            state.slug = 'interview'
            setSlug('interview')
          }}
        >
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
          className={`w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg cursor-pointer ${
            state.slug === 'career' ? 'text-white' : ''
          }`}
          style={{
            background: state.slug === 'career' ? 'linear-gradient(rgb(67, 212, 117), rgb(43, 213, 93))' : '#fff',
          }}
          onClick={() => {
            state.slug = 'career'
            setSlug('career')
          }}
        >
          <div>职场与内推</div>
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
        <div
          className={`w-[176px] h-full pt-3 pl-4 flex flex-col justify-between rounded-lg cursor-pointer ${
            state.slug === 'other' ? 'text-white' : ''
          }`}
          style={{
            background: state.slug === 'other' ? 'linear-gradient(rgb(67, 212, 117), rgb(43, 213, 93))' : '#fff',
          }}
          onClick={() => {
            state.slug = 'other'
            setSlug('other')
          }}
        >
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
        <div
          className={`w-[176px] h-full pt-3 pl-4 flex  justify-between rounded-lg cursor-pointer ${
            state.slug === 'study-sharing' ? 'text-white' : ''
          }`}
          style={{
            background:
              state.slug === 'study-sharing' ? 'linear-gradient(rgb(255, 190, 94), rgb(255, 161, 22))' : '#fff',
          }}
          onClick={() => {
            state.slug = 'study-sharing'
            setSlug('study-sharing')
          }}
        >
          <div>学习分享</div>
          <Image
            src='https://static.leetcode.cn/cn-mono-assets/production/assets/notes.0e1effb1.png'
            alt=''
            width={36}
            height={36}
            className='relative top-[-6px]'
          ></Image>
        </div>
        <div
          className={`w-[176px] h-full pt-3 pl-4 flex justify-between rounded-lg cursor-pointer  ${
            state.slug === 'study-sharing' ? 'text-white' : ''
          }`}
          style={{
            background:
              state.slug === 'study-sharing' ? 'linear-gradient(rgb(78, 191, 254), rgb(15, 165, 250))' : '#fff',
          }}
          onClick={() => {
            state.slug = 'study-sharing'
            setSlug('study-sharing')
          }}
        >
          <div>意见反馈</div>
          <Image
            src='https://static.leetcode.cn/cn-mono-assets/production/assets/feedback.6ed8deff.png'
            alt=''
            width={36}
            height={36}
            className='relative top-[-6px]'
          ></Image>
        </div>
      </div>
    </div>
  )
}

export default PicCard
