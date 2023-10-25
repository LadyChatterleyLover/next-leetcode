'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { DiscussItem } from '@/app/types'
import { Avatar, Divider, Pagination, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CommentOutlined, EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'

const QaList = () => {
  const router = useRouter()

  const state = useReactive<{
    discussList: DiscussItem[]
    pageSize: number
    total: number
    subjectSlug: string
    isFeatured: boolean
    pageNum: number
    query: string
    tags: string[]
    sortType: string
  }>({
    discussList: [],
    pageSize: 0,
    total: 0,
    subjectSlug: 'interview',
    isFeatured: false,
    pageNum: 0,
    query: '',
    tags: [],
    sortType: 'HOTTEST',
  })

  const getQaList = () => {
    axios
      .post('/api/qaQuestionList', {
        subjectSlug: state.subjectSlug,
        isFeatured: state.isFeatured,
        pageNum: state.pageNum,
        query: state.query,
        tags: state.tags,
        sortType: state.sortType,
      })
      .then(res => {
        const data = res.data.data
        state.discussList = data.nodes
        state.pageSize = data.pageSize
        state.total = data.totalNum
        console.log('res', data)
      })
  }

  useEffect(() => {
    getQaList()
  }, [])
  return (
    <div className='mt-5'>
      {state.discussList.length ? (
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
