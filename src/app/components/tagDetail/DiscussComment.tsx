'use client'

import { DiscussItem } from '@/app/types'
import {
  CheckOutlined,
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
  SortAscendingOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Avatar, Divider, Pagination, Popover } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

interface Props {
  uuid: string
  detail: DiscussItem
}

const DiscussComment: React.FC<Props> = ({ uuid, detail }) => {
  const state = useReactive<{
    commentList: DiscussItem[]
    orderBy: 'HOTTEST' | 'LATEST'
    pageNum: number
    total: number
    sortText: string
    current: number
  }>({
    commentList: [],
    orderBy: 'HOTTEST',
    pageNum: 0,
    total: 0,
    sortText: '最热',
    current: 1,
  })

  const sortList: { name: string; value: 'HOTTEST' | 'LATEST' }[] = [
    {
      name: '最热',
      value: 'HOTTEST',
    },
    {
      name: '最新',
      value: 'LATEST',
    },
  ]
  const content = () => {
    return (
      <div className='flex flex-col gap-2'>
        {sortList.map(item => {
          return (
            <div
              key={item.value}
              className={`flex items-center cursor-pointer justify-between ${
                state.orderBy === item.value ? 'text-[#0a84ff]' : ''
              }`}
              onClick={() => {
                state.sortText = item.name
                state.orderBy = item.value
                getCommentList()
              }}
            >
              <div>{item.name}</div>
              {state.orderBy === item.value ? <CheckOutlined></CheckOutlined> : null}
            </div>
          )
        })}
      </div>
    )
  }

  const getCommentList = () => {
    axios
      .post('/api/qaAnswerList', {
        uuid,
        orderBy: state.orderBy,
        pageNum: state.pageNum,
      })
      .then(res => {
        state.commentList = res.data.data.list
        state.total = res.data.data.total
      })
  }

  useEffect(() => {
    getCommentList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    detail && (
      <>
        <div
          className='my-5 py-[10px] px-4 flex items-center justify-between rounded-lg bg-white text-[#bfbfbf] text-xs'
          style={{
            boxShadow: '0px 1px 2px rgba(0,0,0, 0.1),0px 2px 8px rgba(0,0,0, 0.08)',
          }}
        >
          <div>共 {detail?.numAnswers} 个回复</div>
          <Popover
            content={content}
            placement='bottomRight'
            arrow={false}
            trigger='click'
            overlayStyle={{ width: 120 }}
          >
            <div className='text-sm text-[#8c8c8c] hover:text-[#0a84ff] flex items-center gap-x-1 cursor-pointer'>
              <div>{state.sortText}</div>
              <SortAscendingOutlined></SortAscendingOutlined>
            </div>
          </Popover>
        </div>
        {state.commentList.length ? (
          <>
            {state.commentList.map(item => {
              return (
                <div
                  key={item.uuid}
                  className='p-4 rounded-lg mb-5'
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className='flex items-center justify-between '>
                    <div className='flex items-center gap-x-2'>
                      <Avatar size={22} src={item.contentAuthor.avatar}></Avatar>
                      <div className='text-sm text-[#8c8c8c]'>{item.contentAuthor.realName}</div>
                    </div>
                    <div className='flex items-center gap-x-2 text-[#bfbfbf] text-sm'>
                      <div>来自{item.ipRegion}</div>
                      <div className='w-1 h-1 bg-[#bfbfbf] rounded-full'></div>
                      <div>{dayjs(item.createdAt).format('YYYY.MM.DD')}</div>
                    </div>
                  </div>
                  <div className='mt-5 leading-6 overflow-hidden'>
                    <div className='overflow-x-auto'>
                      <Markdown rehypePlugins={[rehypeHighlight]}>{item.content}</Markdown>
                    </div>
                  </div>
                  <Divider></Divider>
                  <div className='mt-8 flex items-center text-[#8c8c8c] text-sm gap-x-1'>
                    <div className='flex items-center gap-x-2 cursor-pointer hover:text-[#0fb55d]'>
                      <LikeOutlined />
                      {item.reactionsV2.length ? item.reactionsV2[0].count : 0}
                    </div>
                    <Divider type='vertical' style={{ margin: '0 16px' }}></Divider>
                    <div className='flex items-center gap-x-4'>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff]'>
                        <CommentOutlined />
                        <div>回复</div>
                      </div>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#ffa116]'>
                        <StarOutlined />
                        <div>收藏</div>
                      </div>
                      <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff] '>
                        <ShareAltOutlined></ShareAltOutlined>
                        <div>分享</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className='mt-4'>
              <Pagination
                total={state.total}
                current={state.current}
                pageSize={10}
                onChange={page => {
                  state.current = page
                  state.pageNum = page - 1
                  getCommentList()
                }}
              ></Pagination>
            </div>
          </>
        ) : null}
      </>
    )
  )
}

export default DiscussComment
