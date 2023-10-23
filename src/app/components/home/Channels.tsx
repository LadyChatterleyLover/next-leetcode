'use client'

import { useCallback, useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Spin } from 'antd'

interface Channels {
  id: number
  name: string
  slug: string
}

interface Props {
  setCurrentId: (val: number) => void
}

const Channels: React.FC<Props> = ({ setCurrentId }) => {
  const state = useReactive<{
    channels: Channels[]
    currentId: number
  }>({
    channels: [],
    currentId: -1,
  })

  const getHomeChannels = () => {
    axios.get('/api/homePageChannels').then(res => {
      state.channels = res.data.data
      state.currentId = res.data.data[0].id
      setCurrentId(state.currentId)
    })
  }

  useEffect(() => {
    getHomeChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.channels.length ? (
    <div className='flex'>
      {state.channels.map(item => {
        return (
          <div
            key={item.id}
            className={`${
              state.currentId === item.id ? 'text-[#1a1a1a] bg-[#0000000a]' : ''
            } mx-2 inline-block cursor-pointer px-3 py-2 text-base first:ml-0 last:mr-0 text-[#0000008c] hover:text-[#1a1a1a]`}
            onClick={() => {
              state.currentId = item.id
              setCurrentId(item.id)
            }}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default Channels
