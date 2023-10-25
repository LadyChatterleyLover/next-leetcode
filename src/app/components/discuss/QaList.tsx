'use client'

import { Avatar, Divider, Pagination, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CommentOutlined, EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { DiscussItem } from '@/app/types'
import { useReactive } from 'ahooks'
import React, { useEffect } from 'react'
import axios from 'axios'

interface Props {
  subjectSlug: string
  sortType: string
  query: string
  isFeatured: boolean
  tags: string[]
}

const QaList: React.FC<Props> = ({ subjectSlug, sortType, query, isFeatured, tags }) => {
  const router = useRouter()

  const state = useReactive<{
    pageSize: number
    total: number
    pageNum: number
    discussList: DiscussItem[]
  }>({
    pageSize: 0,
    total: 0,
    pageNum: 0,
    discussList: [],
  })

  const getQaList = () => {
    axios
      .post('/api/qaQuestionList', {
        subjectSlug,
        isFeatured,
        pageNum: state.pageNum,
        query,
        tags,
        sortType,
      })
      .then(res => {
        const data = res.data.data
        state.discussList = data.nodes
        state.pageSize = data.pageSize
        state.total = data.totalNum
      })
  }

  useEffect(() => {
    getQaList()
  }, [sortType, subjectSlug, tags, query, isFeatured])

  return (
    <div className='mt-5'>
      {state.total ? (
        state.discussList.length ? (
          state.discussList.map((item, index) => {
            return (
              <div
                key={index}
                className='mb-5 bg-white p-4 rounded-lg flex justify-between cursor-pointer'
                style={{
                  boxShadow: '0 1px 2px rgba(0,10,32,0.1), 0 2px 8px rgba(0,10,32,0.05)',
                }}
                onClick={() => {
                  router.push('/tag/discuss/' + item.uuid)
                }}
              >
                {item.thumbnail ? (
                  <div className='flex items-center justify-center mr-4'>
                    <Image alt='thumbnail' src={item.thumbnail} width={200} height={120}></Image>
                  </div>
                ) : null}
                <div className='flex flex-col flex-1 cursor-pointer'>
                  <div className='flex items-center'>
                    <Avatar src={item.contentAuthor.avatar} size={32}></Avatar>
                    <div className='ml-3 overflow-hidden text-ellipsis whitespace-nowrap'>{item.title}</div>
                  </div>
                  <div className='flex items-center mt-2'>
                    {item.tags.slice(0, 2).map(tag => {
                      return (
                        <div
                          key={tag.slug}
                          className='px-2 h-6 text-[#3c3c4399] flex justify-center items-center rounded-full text-xs bg-[#000a200c] my-[2px] mx-[10px]'
                        >
                          {tag.nameTranslated || tag.name}
                        </div>
                      )
                    })}
                    {item.tags.length > 2 ? (
                      <div className='px-2 h-6 text-[#3c3c4399] flex justify-center items-center rounded-full text-xs bg-[#000a200c] my-[2px] mx-[10px]'>
                        {item.tags.length - 2}+
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={`mt-3 leading-6 text-sm text-[#595959] cursor-pointer ${
                      item.thumbnail ? 'line-clamp-1' : 'line-clamp-2'
                    }`}
                    style={{ wordBreak: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: item.summary }}
                  ></div>
                  <div className='mt-8 flex items-center text-[#8c8c8c]'>
                    <div className='flex items-center gap-x-2 cursor-pointer hover:text-[#0fb55d]'>
                      <LikeOutlined />
                      {item.reactionsV2.length ? item.reactionsV2[0].count : 0}
                    </div>
                    <Divider type='vertical' style={{ margin: '0 16px' }}></Divider>
                    <div className='flex items-center gap-x-4'>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff]'>
                        <EyeOutlined />
                        {item.hitCount}
                      </div>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff]'>
                        <CommentOutlined />
                        {item.numAnswers}
                      </div>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#ffa116]'>
                        <StarOutlined />
                        {item.favoriteCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='pt-[70px] flex flex-col items-center justify-center'>
            <div className='text-[#b3b3b3] flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='w-5 h-5 mr-2'
              >
                <path
                  fillRule='evenodd'
                  d='M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12zm18 0a8 8 0 11-16 0 8 8 0 0116 0zM8 9a1 1 0 001 1h.01a1 1 0 000-2H9a1 1 0 00-1 1zm6 0a1 1 0 001 1h.01a1 1 0 100-2H15a1 1 0 00-1 1zm-5 5a1 1 0 100 2h6a1 1 0 100-2H9z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <div className='text-sm'>没有找到你搜索的内容</div>
            </div>
            <div
              className='my-4 mx-auto w-[102px] text-sm h-8 flex justify-center items-center cursor-pointer text-[#007aff] hover:text-white hover:bg-[#007aff] rounded-full'
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1)',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='w-4 h-4 mr-2'
              >
                <path
                  fillRule='evenodd'
                  d='M11 20a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM17.018 5c-.26 0-.51.104-.695.288L4.837 16.773l-.463 1.853 1.853-.463L17.712 6.677A.981.981 0 0017.018 5zm-2.11-1.126a2.983 2.983 0 014.219 4.217L7.444 19.773a1 1 0 01-.464.263l-3.738.934a1 1 0 01-1.213-1.212l.934-3.739a1 1 0 01.263-.464L14.91 3.874z'
                  clipRule='evenodd'
                ></path>
              </svg>
              问问大家
            </div>
          </div>
        )
      ) : (
        <Spin></Spin>
      )}
      {state.discussList.length ? (
        <Pagination
          total={state.total}
          pageSize={state.pageSize}
          current={state.pageNum + 1}
          showSizeChanger={false}
          onChange={size => {
            state.pageNum = size - 1
            getQaList()
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        ></Pagination>
      ) : null}
    </div>
  )
}

export default QaList
