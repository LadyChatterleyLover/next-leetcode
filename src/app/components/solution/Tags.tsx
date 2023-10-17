'use client'

import { Tag } from '@/app/types'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import { useState } from 'react'

interface Props {
  languageTags: Tag[]
  otherTags: Tag[]
}

const Tags: React.FC<Props> = ({ languageTags, otherTags }) => {
  const [collapse, setCollapse] = useState(false)

  return (
    <div className='flex'>
      <div className='relative top-11 mr-2'>
        <div className='text-xs w-10 bg-black text-white px-2 py-1 flex justify-center items-center rounded-full whitespace-nowrap'>
          不限
        </div>
      </div>
      <div
        className='relative mt-12 mb-5 flex flex-wrap '
        style={{
          height: collapse ? 'auto' : 20,
          overflow: collapse ? '' : 'hidden',
        }}
      >
        {languageTags.map(item => {
          return (
            <div
              key={item.name}
              className='inline-flex cursor-pointer items-center mr-1.5 mb-1.5 whitespace-nowrap rounded-full px-2 py-[3px] text-xs bg-[#00000014]  text-[#1a1a1abf]'
            >
              {item.name}
            </div>
          )
        })}
        <Divider></Divider>
        {otherTags.map(item => {
          return (
            <div
              key={item.name}
              className='inline-flex cursor-pointer items-center mr-1.5 mb-1.5 whitespace-nowrap rounded-full px-2 py-[3px] text-xs bg-[#00000014]  text-[#1a1a1abf]'
            >
              {item.name}
            </div>
          )
        })}
        <div
          className='h-9 flex items-center absolute bottom-[-7px] right-3 z-10 text-[#3c3c4399] text-sm cursor-pointer'
          onClick={() => {
            setCollapse(!collapse)
          }}
        >
          <span className='bg-gradient-to-l from-white to-[#fff0] w-3 h-9'></span>
          <div className='absolute top-0 right-4 flex items-center justify-end h-full w-[78px] bg-[linear-gradient(to_right,rgba(255,255,255,0),#FFF_70%)]'>
            {collapse ? (
              <UpOutlined style={{ fontSize: 18, color: '#949494' }} />
            ) : (
              <DownOutlined style={{ fontSize: 18, color: '#949494' }} />
            )}
          </div>
        </div>
        B
      </div>
    </div>
  )
}

export default Tags
