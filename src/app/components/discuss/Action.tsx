import { BellOutlined, BulbOutlined, ProfileOutlined, StarOutlined } from '@ant-design/icons'
import React from 'react'

const Action = () => {
  const actions = [
    {
      name: '收藏',
      icon: <StarOutlined></StarOutlined>,
    },
    {
      name: '订阅',
      icon: <BellOutlined></BellOutlined>,
    },
    {
      name: '讨论',
      icon: <BulbOutlined></BulbOutlined>,
    },
    {
      name: '文章',
      icon: <ProfileOutlined></ProfileOutlined>,
    },
  ]

  return (
    <div className='flex items-center gap-x-5'>
      {actions.map((item, index) => {
        return (
          <div key={index} className='flex flex-col items-center justify-center flex-1'>
            <div className='text-[#3c3c4399] text-xl'>{item.icon}</div>
            <div className='text-[#3c3c4399] text-sm'>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Action
