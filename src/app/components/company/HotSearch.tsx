'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { Spin, Image } from 'antd'

interface Company {
  imgUrl: string
  name: string
  slug: string
  __typename: string
}

const HotSearch = () => {
  const state = useReactive<{
    companyList: Company[]
  }>({
    companyList: [],
  })

  const getHotSearchCompany = () => {
    axios.get('/api/interviewHotSearchHistory').then(res => {
      state.companyList = res.data.data.map((item: { company: Company }) => item.company)
      console.log('res', state.companyList)
    })
  }

  useEffect(() => {
    getHotSearchCompany()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <label className='w-[780px] inline-flex relative'>
        <input
          className='w-full rounded-xl border-2 outline-none h-10 text-sm py-1 px-2 text-[#262626] border-solid border-[#dfdfdf] placeholder:text-sm hover:border-[#0a84ff] focus:border-[#0a84ff]'
          placeholder='搜索上千家企业面试题库'
        />
      </label>
      {state.companyList.length ? (
        <div className='mt-5 w-[780px] h-[72px] text-xs flex gap-x-3'>
          <div className='text-[#bfbfbf] relative top-[10px] mr-2'>热门搜索:</div>
          <div className='flex-1 flex flex-wrap gap-x-8'>
            {state.companyList.map(item => {
              return (
                <div
                  key={item.slug}
                  className='flex items-center gap-x-2 flex-wrap max-h-[68px] cursor-pointer hover:bg-[#00000066]'
                >
                  <Image alt='' src={item.imgUrl} width={18} height={18} preview={false}></Image>
                  <div>{item.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <Spin></Spin>
      )}
    </div>
  )
}

export default HotSearch
