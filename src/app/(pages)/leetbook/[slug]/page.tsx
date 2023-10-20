'use client'

import BookInfo from '@/app/components/leetbook/BookInfo'
import BookIntro from '@/app/components/leetbook/BookIntro'
import BookOverview from '@/app/components/leetbook/BookOverview'
import BookPages from '@/app/components/leetbook/BookPages'
import HotBooks from '@/app/components/leetbook/HotBooks'
import { LeetBook } from '@/app/types'
import { useReactive } from 'ahooks'
import axios from 'axios'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

const LeetBookDetail = () => {
  const params = useParams()

  const slug = useMemo(() => {
    return params.slug as string
  }, [params])

  const state = useReactive<{
    bookDetail: LeetBook | null
    currentIndex: number
  }>({
    bookDetail: null,
    currentIndex: 0,
  })

  const tabs = [
    {
      name: '概览',
    },
    {
      name: '目录',
    },
    {
      name: '精选评论',
    },
  ]

  const getBookDetail = useCallback(() => {
    axios
      .post('/api/leetbookBookDetail', {
        slug,
      })
      .then(res => {
        const data = res.data.data
        state.bookDetail = data
      })
  }, [slug, state])

  useEffect(() => {
    getBookDetail()
  }, [getBookDetail])
  return (
    <div className='w-full h-full leetbookContainer'>
      <div className='mx-auto py-8  max-w-[72rem] min-w-[1200px]'>
        <div className='flex w-full gap-x-10'>
          <div className='flex flex-col flex-1'>
            <BookInfo bookDetail={state.bookDetail!}></BookInfo>
            <div className='flex mt-[60px] gap-x-8 h-[45px]' style={{ borderBottom: '1px solid #e5e5e5' }}>
              {tabs.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='text-lg h-[45px] font-[500] cursor-pointer'
                    style={{
                      borderBottom: state.currentIndex === index ? '2px solid #000' : '',
                    }}
                    onClick={() => {
                      state.currentIndex = index
                    }}
                  >
                    {item.name}
                  </div>
                )
              })}
            </div>
            <div className='mt-8'>
              {state.currentIndex === 0 ? <BookOverview bookDetail={state.bookDetail!}></BookOverview> : null}
              {state.currentIndex === 1 ? <BookPages slug={slug}></BookPages> : null}
            </div>
          </div>
          <div className='w-[300px] flex flex-col mt-10'>
            {state.bookDetail ? <BookIntro bookDetail={state.bookDetail!}></BookIntro> : null}
            <HotBooks slug={slug}></HotBooks>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeetBookDetail
