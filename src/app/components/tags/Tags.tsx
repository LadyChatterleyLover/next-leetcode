'use client'

import { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { tagList } from './data'
import { useRouter } from 'next/navigation'

const Tags = () => {
  const router = useRouter()
  const [collapse, setCollapse] = useState(false)
  return (
    <div
      className='relative mt-12 mb-5 flex flex-wrap'
      style={{
        height: collapse ? 'auto' : 20,
        overflow: collapse ? '' : 'hidden',
      }}
    >
      {tagList.map(item => {
        return (
          <div
            key={item.tag}
            className='group inline-flex items-center mb-2 mr-2 cursor-pointer hover:text-blue-400'
            onClick={() => {
              router.push(`/tag/${item.title}`)
            }}
          >
            <div className='whitespace-nowrap text-sm group-hover:hover:text-blue-400'>{item.tag}</div>
            <div className='ml-1 flex h-[18px] bg-[#000a200d] text-[#3c3c4399] items-center justify-center rounded-[10px] px-1.5 text-xs font-normal text-label-3 bg-fill-3 group-hover:text-blue-400  group-hover:bg-blue-100 '>
              {item.nums}
            </div>
          </div>
        )
      })}
      <div
        className='h-9 flex items-center absolute bottom-[-7px] right-0 z-10 text-[#3c3c4399] text-sm cursor-pointer'
        onClick={() => {
          setCollapse(!collapse)
        }}
      >
        <span className='bg-gradient-to-l from-white to-[#fff0] w-6 h-9'></span>
        <div className='h-full flex items-center'>
          <span>{collapse ? '收起' : '展开'}</span>
          {collapse ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
    </div>
  )
}

export default Tags
