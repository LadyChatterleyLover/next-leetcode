'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { CompanyCard } from '@/app/types'
import { Button, Divider, Pagination, Spin } from 'antd'
import Image from 'next/image'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const CompanyList = () => {
  const state = useReactive<{
    companyCardList: CompanyCard[]
    current: number
    offset: number
    limit: number
    total: number
    hasMore: boolean
  }>({
    companyCardList: [],
    current: 1,
    offset: 0,
    limit: 12,
    total: 0,
    hasMore: true,
  })

  const getCompanyList = () => {
    axios
      .post('/api/interviewHotCompanyCards', {
        offset: state.offset,
        limit: state.limit,
      })
      .then(res => {
        const data = res.data.data
        state.companyCardList = data.cards
        state.total = data.total
        state.hasMore = data.hasMore
      })
  }

  useEffect(() => {
    getCompanyList()
  }, [])

  return state.companyCardList.length ? (
    <div className='w-full'>
      <div className='flex flex-wrap'>
        {state.companyCardList.map(item => {
          return (
            <div
              key={item.id}
              className='m-2 w-[272px] h-[250px] rounded-xl overflow-hidden flex flex-col cursor-pointer'
              style={{
                boxShadow: '0px 1px 2px rgba(0,0,0, 0.1),0px 2px 8px rgba(0,0,0, 0.08)',
              }}
            >
              <div className='flex-1 bg-white'>
                <div className='px-4 pt-4'>
                  <Image
                    alt=''
                    src={item.companyInfo.companyTag.imgUrl}
                    width={48}
                    height={48}
                    style={{ border: '1px solid #f0f0f0' }}
                  ></Image>
                </div>
                <div className='px-4 pt-4 text-[#595959] mb-3'>
                  <div className='text-sm font-bold mb-3'>{item.companyInfo.companyTag.name}</div>
                  <div className='text-xs text-[]'>企业题目数: {item.companyInfo.companyTag.questionCount}</div>
                </div>
                <div className='flex items-center'>
                  {item.companyInfo.jobCompany && item.companyInfo.jobCompany.isVerified ? (
                    <div className='flex items-center pr-4 text-[#2db55d] text-xs ml-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        className='w-3 h-3 mr-1'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.213 1.023l.138.04 8 3a1 1 0 01.641.813L21 5v7c0 2.97-1.646 5.644-4.341 8.003a22.459 22.459 0 01-3.524 2.515l-.35.199-.338.177a1 1 0 01-.894 0l-.338-.177-.448-.256-.547-.332a22.46 22.46 0 01-2.879-2.126c-2.602-2.278-4.226-4.85-4.335-7.697L3 12V5a1 1 0 01.536-.886l.113-.05 8-3a1 1 0 01.45-.059l.114.018zM12 3.068L5 5.693V12c0 2.105 1.154 4.142 3.144 6.029l.253.235.261.233a20.49 20.49 0 002.622 1.936l.45.274.27.155.27-.155.45-.274c.895-.559 1.79-1.208 2.621-1.936 2.216-1.938 3.553-4.047 3.653-6.234L19 12V5.693l-7-2.625zm2.302 6.225a1 1 0 011.497 1.32l-.083.094-3.888 3.888a1.5 1.5 0 01-2.007.103l-.114-.103-1.414-1.414a1 1 0 011.32-1.498l.094.084 1.06 1.06 3.535-3.534z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      企业
                    </div>
                  ) : null}
                  {item.companyInfo.jobCompany && item.companyInfo.jobCompany.jobPostingCount > 0 ? (
                    <Divider type='vertical'></Divider>
                  ) : null}
                  {item.companyInfo.jobCompany && item.companyInfo.jobCompany.jobPostingCount > 0 ? (
                    <div className='flex items-center gap-x-1 text-sm text-[#3c3c4399] ml-1'>
                      <div>特邀岗位</div>
                      <div className='text-[#3c3c4399] text-base'>{item.companyInfo.jobCompany.jobPostingCount}</div>
                      <div>个</div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='h-12 bg-[#f7f7f7] flex items-center text-sm'>
                <div className='flex-1 flex items-center justify-center text-[#262626bf] cursor-pointer'>企业题库</div>
                <div className='flex-1 flex items-center justify-center text-[#ffa116] cursor-pointer'>
                  开始模拟面试
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex items-center justify-between mt-6'>
        <Button
          shape='circle'
          icon={<LeftOutlined />}
          disabled={state.offset === 0}
          onClick={() => {
            state.current -= 1
            state.offset = (state.current - 1) * state.limit
            getCompanyList()
          }}
        />
        <Pagination
          showSizeChanger={false}
          current={state.current}
          pageSize={state.limit}
          total={state.total}
          onChange={page => {
            state.offset = (page - 1) * state.limit
            state.current = page
            getCompanyList()
          }}
        ></Pagination>
        <Button
          shape='circle'
          icon={<RightOutlined />}
          disabled={!state.hasMore}
          onClick={() => {
            state.current += 1
            state.offset = (state.current - 1) * state.limit
            getCompanyList()
          }}
        />
      </div>
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default CompanyList
