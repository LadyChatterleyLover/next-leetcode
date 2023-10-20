import { useReactive } from 'ahooks'
import { Avatar, Spin } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useEffect } from 'react'

interface Item {
  title: string
  uuid: string
  author: {
    avatar: string
    userSlug: string
    __typename: string
  }
}

const QaBriefHotQuestions = () => {
  const state = useReactive<{
    list: Item[]
  }>({
    list: [],
  })

  const getQaBriefHotQuestions = () => {
    axios.get('/api/qaBriefHotQuestions').then(res => {
      state.list = res.data.data
      console.log('res', res.data.data)
    })
  }

  useEffect(() => {
    getQaBriefHotQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.list.length ? (
    <div
      className='bg-white px-3 py-4 rounded-lg w-[260px]'
      style={{ boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1)' }}
    >
      <div className='flex gap-x-3 mb-5 items-center text-sm'>
        <Image
          alt='logo'
          src='https://static.leetcode.cn/cn-mono-assets/production/assets/hot.b04eceef.png'
          width={14}
          height={14}
        ></Image>
        <div>相关讨论</div>
      </div>
      {state.list.map(item => {
        return (
          <div key={item.uuid} className='flex items-center gap-x-2 mb-3 cursor-pointer hover:bg-[#f7f7f8] text-sm'>
            <Avatar src={item.author.avatar} size={30}></Avatar>
            <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-1'>{item.title}</div>
          </div>
        )
      })}
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default QaBriefHotQuestions
