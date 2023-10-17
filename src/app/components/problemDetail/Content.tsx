'use client'

import { ProblemDetail } from '@/app/types'
import { Divider } from 'antd'
import Description from './Description'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Solution from './Solution'
import Submission from './Submission'

interface Props {
  detail: ProblemDetail
  title: string
  slugTitle: string
}

interface MenuItem {
  key: string
  label: string
  icon: React.ReactNode
}

const Content = (props: Props) => {
  const { detail, title, slugTitle } = props
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const type = useMemo(() => {
    return searchParams.get('type') || 'problem'
  }, [searchParams])
  const items: MenuItem[] = [
    {
      label: '题目描述',
      key: 'problem',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 14 14'
          width='1em'
          height='1em'
          fill='currentColor'
          className='h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-blue-60 dark:text-blue-60'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.9 4.2h4.2M4.9 6.3h4.2M4.9 8.4H7m-3.15-7h6.3a1.4 1.4 0 011.4 1.4v8.4a1.4 1.4 0 01-1.4 1.4h-6.3a1.4 1.4 0 01-1.4-1.4V2.8a1.4 1.4 0 011.4-1.4z'
          ></path>
        </svg>
      ),
    },
    {
      label: '题解',
      key: 'solution',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 14 14'
          width='1em'
          height='1em'
          fill='currentColor'
          className='h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-blue-60 dark:text-blue-60'
        >
          <path d='M4.367 1.633h5.047m-4.17 4.093V1.692c0-.033.027-.059.059-.059h3.251c.032 0 .058.026.058.059v4.457c0 .012.004.023.01.033l2.754 3.977c.646.933-.022 2.208-1.157 2.208H3.73a1.407 1.407 0 01-1.17-2.19l2.675-3.995c.006-.01.01-.021.01-.033v-.423zm0 0H6.67M5.244 3.65H6.67'></path>
        </svg>
      ),
    },
    {
      label: '提交记录',
      key: 'submission',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 14 14'
          width='1em'
          height='1em'
          fill='currentColor'
          className='h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-blue-60 dark:text-blue-60'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M11.97 7a5.6 5.6 0 01-5.602 5.6 5.6 5.6 0 114.852-8.4m-.787 3.414l1.4-1.4 1.4 1.4m-4.766.913l-2.1-.7V4.9'
          ></path>
        </svg>
      ),
    },
  ]

  return (
    <div className='m-[10px] pl-5 py-2 bg-white h-full w-full'>
      <div style={{ borderBottom: '1px solid #eee' }} className='fixed '>
        <div className='flex items-center px-4 h-9'>
          <div className='flex items-center h-full gap-2'>
            {items.map((item, index) => {
              return (
                <div
                  key={item.key}
                  className='relative flex items-center cursor-pointer overflow-hidden text-xs capitalize  hover:bg-[#0000000a]'
                  style={{
                    background: type === item.key ? '#0000' : '',
                    color: type === item.key ? '#1a1a1a' : '#0000008c',
                    fontWeight: type === item.key ? 500 : 400,
                  }}
                  onClick={() => {
                    router.push(`${pathname}?title=${title}&slugTitle=${slugTitle}&type=${item.key}`)
                  }}
                >
                  <div className='h-full flex items-center text-[#007aff]'>{item.icon}</div>
                  <div className='h-full flex items-center ml-1'>{item.label}</div>
                  {index !== items.length - 1 ? <Divider type='vertical'></Divider> : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {type === 'problem' ? (
        <div className='mt-10 h-full pb-[100px]'>
          <Description detail={detail} title={title} slugTitle={slugTitle}></Description>
        </div>
      ) : null}
      {type === 'solution' ? (
        <div className='mt-10 h-full'>
          <Solution></Solution>
        </div>
      ) : null}
      {type === 'submission' ? (
        <div className='mt-10 h-full'>
          <Submission></Submission>
        </div>
      ) : null}
    </div>
  )
}

export default Content
