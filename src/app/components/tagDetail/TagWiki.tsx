'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface Wiki {
  content: string
  isPublic: boolean
  tag: {
    name: string
    slug: string
    nameTranslated: string
    imgUrl: string | null
    tagType: string
    __typename: string
  }
}

const TagWiki = ({ slug }: { slug: string }) => {
  const [wiki, setWiki] = useState<Wiki>()
  const [flag, setFlag] = useState(false)

  const getTagWiki = useCallback(() => {
    axios
      .post('/api/tagWiki', {
        slug,
      })
      .then(res => {
        setWiki(res.data.data)
      })
  }, [slug])

  useEffect(() => {
    getTagWiki()
  }, [getTagWiki])

  return (
    <div className='flex-1'>
      <div className='flex items-center my-8'>
        <Image
          alt='logo'
          src='https://static.leetcode.cn/cn-mono-assets/production/assets/default-logo.9a56567f.png'
          width={50}
          height={50}
        ></Image>
        <div className='text-xl font-bold ml-8'>{wiki?.tag.nameTranslated}</div>
      </div>
      <div className={`relative text-[#262626bf] ${!flag ? 'line-clamp-2' : ''}`}>
        <div style={{ width: 'calc(100% - 50px)' }} className='tag-wiki'>
          <Markdown>{wiki?.content}</Markdown>
        </div>
        <div
          className='absolute right-0 bottom-0 flex items-center z-50 cursor-pointer'
          onClick={() => {
            setFlag(!flag)
          }}
        >
          <div className='text-[#3c3c4399]'>{flag ? '收起' : '全文'}</div>
          {flag ? (
            <UpOutlined style={{ fontSize: 14, color: '#3c3c4399' }}></UpOutlined>
          ) : (
            <DownOutlined style={{ fontSize: 14, color: '#3c3c4399' }}></DownOutlined>
          )}
        </div>
      </div>
    </div>
  )
}

export default TagWiki
