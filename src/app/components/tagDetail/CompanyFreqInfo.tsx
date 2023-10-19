'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Progress } from 'antd'

interface Tag {
  imgUrl: string | null
  name: string
  slug: string
  translatedName: string | null
  __typename: string
  highFreqQuestionTags: {
    name: string
    slug: string
    translatedName: string
    __typename: string
  }[]
}

interface OverallFrequency {
  globalMaxFreq: number
  maxFreq: number
}

const CompanyFreqInfo = ({ slug }: { slug: string }) => {
  const [tagList, setTagList] = useState<Tag[]>([])
  const [percent, setPercent] = useState(0)

  const getCompanyFreqInfo = useCallback(() => {
    axios
      .post('/api/companyFreqInfo', {
        slug,
      })
      .then(res => {
        setTagList(res.data.data.tags)
        setPercent((res.data.data.overallFrequency.maxFreq / res.data.data.overallFrequency.globalMaxFreq) * 100)
      })
  }, [slug])

  useEffect(() => {
    getCompanyFreqInfo()
  }, [getCompanyFreqInfo])

  return (
    tagList.length && (
      <div
        className='bg-white px-3 py-4 rounded-lg mt-5 w-[260px]'
        style={{ boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1)' }}
      >
        <div className='mb-4 text-sm leading-5 text-[#262626bf] font-500'>知识点出题频率</div>
        <div className='flex items-center'>
          <Progress percent={percent} showInfo={false} strokeColor='#ffa116' size={16}></Progress>
          <div className='text-[#ffa116] relative top-[-2px]'>
            {percent >= 0 && percent <= 30 ? '低' : percent > 30 && percent <= 60 ? '中' : '高'}
          </div>
        </div>
        {tagList.map(item => {
          return (
            <div key={item.slug}>
              <div className='flex'>
                <div>
                  <Image
                    alt='pic'
                    src={
                      item.imgUrl ||
                      'https://static.leetcode.cn/cn-mono-assets/production/assets/default-company-logo.1152beca.png'
                    }
                    width={38}
                    height={38}
                  ></Image>
                </div>
                <div className='ml-5 flex flex-col'>
                  <div className='text-[#262626] text-sm leading-5 font-500 overflow-ellipsis overflow-hidden whitespace-pre'>
                    {item.name}
                  </div>
                  <div className='my-4 flex'>
                    {item.highFreqQuestionTags.slice(0, 2).map(tag => {
                      return (
                        <div
                          key={tag.name}
                          className='text-xs mr-2 leading-5 px-2 text-[#3c3c4399] bg-[#000a200c] rounded-[10px] whitespace-nowrap'
                        >
                          {tag.translatedName}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}

export default CompanyFreqInfo
