'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Input, message } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface CompanyTag {
  id: string
  name: string
  questionCount: number
  slug: string
}

const CompanyTag = () => {
  const [offset, setOffset] = useState(0)
  const [companyTagList, setCompanyTagList] = useState<CompanyTag[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [keyWord, setKeyWord] = useState('')

  const getCompanyTag = (offset: number) => {
    axios
      .post('/api/companyTag', {
        offset,
      })
      .then(res => {
        setCompanyTagList(res.data.data.list)
        setHasMore(res.data.data.hasMore)
      })
  }

  const getInterviewSearchCompanyCards = (offset: number, val: string) => {
    axios
      .post('/api/interviewSearchCompanyCards', {
        keyWords: val,
        offset,
      })
      .then(res => {
        setCompanyTagList(res.data.data.list)
        setHasMore(res.data.data.hasMore)
      })
  }

  const onSearch = (val: string) => {
    if (!val) {
      getCompanyTag(offset)
    } else {
      getInterviewSearchCompanyCards(offset, val)
    }
  }

  useEffect(() => {
    getCompanyTag(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    companyTagList.length && (
      <div
        className='bg-white rounded-lg px-4 pb-1 pt-2 '
        style={{
          boxShadow:
            '0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 6px 12px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div className='flex h-[36px] items-center justify-between'>
          <div className='text-sm font-medium text-[#262626bf] css-0'>热门企业题库</div>
          <div className='flex items-center'>
            <Button
              size='small'
              icon={<LeftOutlined />}
              disabled={offset === 0}
              className='mr-1'
              onClick={() => {
                setOffset(val => (val -= 15))
                if (!keyWord) {
                  getCompanyTag(offset - 15)
                } else {
                  getInterviewSearchCompanyCards(offset - 15, keyWord)
                }
              }}
            ></Button>
            <Button
              size='small'
              icon={<RightOutlined />}
              disabled={!hasMore}
              onClick={() => {
                setOffset(val => (val += 15))
                if (!keyWord) {
                  getCompanyTag(offset + 15)
                } else {
                  getInterviewSearchCompanyCards(offset + 15, keyWord)
                }
              }}
            ></Button>
          </div>
        </div>
        <div className='w-full my-2'>
          <Input.Search
            placeholder='输入企业名称'
            allowClear
            value={keyWord}
            onSearch={(val: string) => onSearch(val)}
            onChange={e => {
              setKeyWord(e.target.value)
            }}
          ></Input.Search>
        </div>
        <div className='flex flex-wrap'>
          {companyTagList.map(item => {
            return (
              <div key={item.id} className='mb-4 mr-3'>
                <span className='inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full text-label-3 dark:text-dark-label-3 bg-fill-3 dark:bg-dark-fill-3'>
                  <span className='max-w-[200px] overflow-hidden overflow-ellipsis font-medium text-[#262626bf]'>
                    {item.name}
                  </span>
                  <span className='ml-1 rounded-full px-1.5 text-xs font-normal bg-[#ffa116]  text-white'>
                    {item.questionCount}
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}

export default CompanyTag
