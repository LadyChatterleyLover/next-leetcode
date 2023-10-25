'use client'

import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Avatar, Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface TrendingContent {
  articleType: number
  author: {
    avatar: string
    name: string
    userSlug: string
    __typename: string
  }
  createdAt: string
  summary: string
  title: string
  uuid: string
  __typename: string
}

const MustRead = () => {
  const router = useRouter()

  const state = useReactive<{
    trendingContentList: TrendingContent[]
    currentSlug: string
  }>({
    trendingContentList: [],
    currentSlug: 'ri',
  })

  const dayList = [
    {
      name: '日',
      value: 'ri',
    },
    {
      name: '周',
      value: 'zhou-3',
    },
    {
      name: '月',
      value: 'yue-2',
    },
  ]

  const getTrendingContentList = () => {
    axios
      .post('/api/trendingContents', {
        subListSlug: state.currentSlug,
      })
      .then(res => {
        state.trendingContentList = res.data.data
      })
  }

  useEffect(() => {
    getTrendingContentList()
  }, [])

  return (
    <div className='sticky top-2'>
      <div>
        <div
          className='bg-white rounded-lg min-w-[120px] px-4 pt-4 pb-1'
          style={{
            boxShadow: '0px 1px 2px rgba(0,0,0, 0.1),0px 2px 8px rgba(0,0,0, 0.08)',
          }}
        >
          <div className='flex items-center justify-between mb-5'>
            <div className='text-sm text-[#262626bf]'>必读榜</div>
            <div className='flex gap-x-1'>
              {dayList.map(item => {
                return (
                  <div
                    key={item.value}
                    className={`w-[38px] h-6 text-xs rounded-lg flex justify-center items-center cursor-pointer   ${
                      state.currentSlug === item.value
                        ? 'font-[500] text-[#262626] bg-[#000a200c]'
                        : 'text-[#3c3c4399] font-normal'
                    }`}
                    onClick={() => {
                      state.currentSlug = item.value
                      getTrendingContentList()
                    }}
                  >
                    {item.name}
                  </div>
                )
              })}
            </div>
          </div>
          {state.trendingContentList.length ? (
            <div>
              {state.trendingContentList.map((item, index) => {
                return (
                  <div
                    key={item.uuid}
                    className='py-2 mb-3 cursor-pointer hover:bg-[#f7f7f8] px-2'
                    onClick={() => {
                      router.push('/tag/discuss/' + item.uuid)
                    }}
                  >
                    <div className='flex'>
                      <div className={`min-w-[10px] mr-[6px] relative top-1 ${index < 3 ? 'text-[#ffa116]' : ''}`}>
                        {index + 1}
                      </div>
                      <div className='flex flex-1 items-center gap-x-1'>
                        <div className='w-[22px]'>
                          <Avatar src={item.author.avatar} size={22}></Avatar>
                        </div>
                        <div className='text-sm flex-1 line-clamp-1'>{item.title}</div>
                      </div>
                      <Image
                        alt=''
                        src='https://static.leetcode.cn/cn-mono-assets/production/assets/new.77389df8.png'
                        width={15}
                        height={15}
                      ></Image>
                    </div>
                    <div className='text-xs text-[#3c3c434c] line-clamp-1 ml-5 mt-2'>{item.summary}</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <Spin></Spin>
          )}
        </div>
      </div>
    </div>
  )
}

export default MustRead
