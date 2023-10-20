'use client'

import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Button, Input, Spin } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface CompanyTag {
  id: string
  name: string
  questionCount: number
  slug: string
}

const CompanyTag = () => {
  const state = useReactive<{
    companyTagList: CompanyTag[]
    offset: number
    keyWord: string
    hasMore: boolean
  }>({
    companyTagList: [],
    offset: 0,
    keyWord: '',
    hasMore: false,
  })

  const getCompanyTag = () => {
    axios
      .post('/api/companyTag', {
        offset: state.offset,
      })
      .then(res => {
        state.companyTagList = res.data.data.list
        state.hasMore = res.data.data.hasMore
      })
  }

  const getInterviewSearchCompanyCards = () => {
    axios
      .post('/api/interviewSearchCompanyCards', {
        keyWords: state.keyWord,
        offset: state.offset,
      })
      .then(res => {
        state.companyTagList = res.data.data.list
        state.hasMore = res.data.data.hasMore
      })
  }

  const onSearch = (val: string) => {
    if (!val) {
      getCompanyTag()
    } else {
      state.keyWord = val
      getInterviewSearchCompanyCards()
    }
  }

  useEffect(() => {
    getCompanyTag()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.companyTagList.length ? (
    <div
      className='bg-white rounded-lg px-4 pb-1 pt-2 '
      style={{
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 6px 12px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div className='flex h-[36px] items-center justify-between'>
        <div className='text-sm font-medium text-[#262626bf] css-0'>热门企业题库</div>
        <div className='flex items-center'>
          <Button
            size='small'
            icon={<LeftOutlined />}
            disabled={state.offset === 0}
            className='mr-1'
            onClick={() => {
              state.offset -= 15
              if (!state.keyWord) {
                getCompanyTag()
              } else {
                getInterviewSearchCompanyCards()
              }
            }}
          ></Button>
          <Button
            size='small'
            icon={<RightOutlined />}
            disabled={!state.hasMore}
            onClick={() => {
              state.offset += 15
              if (!state.keyWord) {
                getCompanyTag()
              } else {
                getInterviewSearchCompanyCards()
              }
            }}
          ></Button>
        </div>
      </div>
      <div className='w-full my-2'>
        <Input.Search
          placeholder='输入企业名称'
          allowClear
          value={state.keyWord}
          onSearch={(val: string) => onSearch(val)}
          onChange={e => {
            state.keyWord = e.target.value
          }}
        ></Input.Search>
      </div>
      <div className='flex flex-wrap'>
        {state.companyTagList.map(item => {
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
  ) : (
    <Spin></Spin>
  )
}

export default CompanyTag
