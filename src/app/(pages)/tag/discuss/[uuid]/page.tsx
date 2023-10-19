'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useReactive } from 'ahooks'
import { DiscussItem } from '@/app/types'
import axios from 'axios'
import { Avatar, Divider, Popover } from 'antd'
import dayjs from 'dayjs'
import { BellOutlined, EditOutlined, LikeOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons'
import DiscussComment from '@/app/components/tagDetail/DiscussComment'

const DiscussCircle = () => {
  const params = useParams()

  const uuid = useMemo(() => {
    return params.uuid as string
  }, [params])

  const state = useReactive<{
    detail: DiscussItem | null
  }>({
    detail: null,
  })

  const getDetail = () => {
    axios
      .post('/api/discussDetail', {
        uuid,
      })
      .then(res => {
        state.detail = res.data.data
      })
  }

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        className='mb-3 p-4 rounded-lg bg-white'
        style={{
          boxShadow: '0px 1px 2px rgba(0,0,0,0.1),0px 2px 8px rgba(0,0,0, 0.08)',
        }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Avatar src={state.detail?.contentAuthor.avatar} size={32}></Avatar>
            <div className='text-xl ml-2'>{state.detail?.title}</div>
          </div>
          <div
            className='flex items-center justify-center text-[#2db55d] py-[5px] px-3 rounded-md cursor-pointer'
            style={{ border: '1px solid #2db55d' }}
          >
            + 关注 TA
          </div>
        </div>
        <div className='mt-2 text-xs text-[#bfbfbf] flex items-center gap-x-2'>
          <div>{state.detail?.contentAuthor.realName}</div>
          <div>发布于 {dayjs(state.detail?.createdAt).format('YYYY.MM.DD HH:mm:ss')}</div>
          <div className='w-1 h-1 rounded-full bg-[#bfbfbf]'></div>
          <div>来自于 {state.detail?.ipRegion}</div>
        </div>
        <div
          className='leading-8 mt-5 whitespace-pre'
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: state.detail?.content! }}
        ></div>
        <div className='mt-3 bg-[#eee] h-[1px]'></div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2 py-[14px] px-4'>
            <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#0fb55d]'>
              <LikeOutlined></LikeOutlined>
              {state.detail?.reactionsV2.length ? state.detail?.reactionsV2[0].count : 0}
            </div>
            <Divider type='vertical'></Divider>
            <div className='flex items-center gap-x-3'>
              <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#ffa116]'>
                <StarOutlined></StarOutlined>
                {state.detail?.favoriteCount}
              </div>
              <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#0a84ff] text-sm'>
                <ShareAltOutlined></ShareAltOutlined>
                分享
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            <div className='flex justify-center items-center py-2 px-4 rounded-lg text-white bg-[#2db55d] cursor-pointer'>
              <EditOutlined></EditOutlined>
              回复讨论
            </div>
            <div
              className='flex justify-center items-center py-2 px-4 rounded-lg text-[#2db55d] cursor-pointer'
              style={{ border: '1px solid #2db55d' }}
            >
              <BellOutlined></BellOutlined>
              接收动态
            </div>
          </div>
        </div>
      </div>
      <DiscussComment uuid={uuid} detail={state.detail!}></DiscussComment>
    </>
  )
}

export default DiscussCircle
