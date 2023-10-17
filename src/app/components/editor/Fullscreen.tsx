import React from 'react'
import { EllipsisOutlined, ExpandOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

const Fullscreen = () => {
  const content = () => (
    <div className='flex items-center cursor-pointer'>
      <ExpandOutlined />
      <span className='ml-2'>放大</span>
    </div>
  )
  return (
    <Popover placement='bottomRight' content={content} trigger='click' arrow={false}>
      <div className='p-1 cursor-pointer hover:bg-gray-100'>
        <EllipsisOutlined />
      </div>
    </Popover>
  )
}

export default Fullscreen
