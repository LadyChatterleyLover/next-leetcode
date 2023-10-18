'use client'

import { AnswerResult, ProblemDetail } from '@/app/types'
import { Divider } from 'antd'
import Description from './Description'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Solution from './Solution'
import Submission from './Submission'
import Answer from './Answer'

interface Props {
  detail: ProblemDetail
  title: string
  slugTitle: string
  submitFlag: boolean
  items: MenuItem[]
}

export interface MenuItem {
  key: string
  label: string
  icon: React.ReactNode
}
const Content = (props: Props) => {
  const { detail, title, slugTitle, submitFlag, items } = props
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const type = useMemo(() => {
    return searchParams.get('type') || 'problem'
  }, [searchParams])

  return (
    items.length && (
      <div className='m-[10px] pl-5 py-2 bg-white h-full w-full'>
        <div className='fixed '>
          <div className='flex items-center px-4 h-9'>
            <div className='flex items-center h-full gap-2'>
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
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
        {type === 'answer' ? (
          <div className='mt-10 h-full'>
            <Answer submitFlag={submitFlag}></Answer>
          </div>
        ) : null}
      </div>
    )
  )
}

export default Content
