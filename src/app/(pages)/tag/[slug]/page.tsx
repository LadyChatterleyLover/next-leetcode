'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import TagWiki from '@/app/components/tagDetail/TagWiki'
import SubjectBook from '@/app/components/tagDetail/SubjectBook'
import CompanyFreqInfo from '@/app/components/tagDetail/CompanyFreqInfo'
import QuestionList from '@/app/components/tagDetail/QuestionList'
import { BellOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Discuss from '@/app/components/tagDetail/Discuss'

const Tag = () => {
  const params = useParams()

  const slug = useMemo(() => {
    return params.slug as string
  }, [params])

  const [currentIndex, setCurrentIndex] = useState(0)
  const tabs = [
    {
      name: '题库',
      key: 0,
      icon: <UnorderedListOutlined />,
    },
    {
      name: '讨论交流',
      key: 1,
      icon: <BellOutlined />,
    },
  ]

  return (
    <div className='flex '>
      <div>
        <TagWiki slug={slug}></TagWiki>
        <div className='mt-8 flex items-center'>
          {tabs.map(item => {
            return (
              <div
                key={item.key}
                className={`flex items-center text-xl mr-8 cursor-pointer px-8 py-2 ${
                  currentIndex === item.key ? 'bg-[#f7f8fa]' : ''
                }`}
                onClick={() => {
                  setCurrentIndex(item.key)
                }}
              >
                {item.icon}
                <div className='ml-2'>{item.name}</div>
              </div>
            )
          })}
        </div>
        <div className='mt-5'>
          {currentIndex === 0 ? <QuestionList slug={slug}></QuestionList> : null}
          {currentIndex === 1 ? <Discuss slug={slug}></Discuss> : null}
        </div>
      </div>
      <div className='w-[260px] mt-[120px] ml-9'>
        <SubjectBook slug={slug}></SubjectBook>
        <CompanyFreqInfo slug={slug}></CompanyFreqInfo>
      </div>
    </div>
  )
}

export default Tag
