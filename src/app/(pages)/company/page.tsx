'use client'

import { useReactive } from 'ahooks'
import { Empty } from 'antd'
import Image from 'next/image'
import Ads from '@/app/components/company/Ads'
import CompanyList from '@/app/components/company/CompanyList'
import HotSearch from '@/app/components/company/HotSearch'
import Jobs from '@/app/components/company/Jobs'
import Navs from '@/app/components/company/Navs'

const Company = () => {
  const state = useReactive<{
    currentNav: string
  }>({
    currentNav: 'company',
  })

  const setNav = (nav: string) => {
    state.currentNav = nav
  }

  return (
    <>
      <div className='w-full h-full bg-white'>
        <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px]'>
          <HotSearch></HotSearch>
          <Navs currentNav={state.currentNav} setNav={setNav}></Navs>
        </div>
      </div>
      <div className='w-full h-full bg-[#f7f8fa]'>
        <div
          className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px]'
          style={{
            height: 'calc(100vh - 270px)',
          }}
        >
          {state.currentNav === 'company' ? (
            <>
              <Ads></Ads>
              <CompanyList></CompanyList>
            </>
          ) : null}
          {state.currentNav === 'job' ? <Jobs></Jobs> : null}
          {state.currentNav === 'history' ? (
            <div className='flex items-center h-full justify-center'>
              <Empty
                image={
                  <Image
                    alt=''
                    src='https://static.leetcode.cn/cn-mono-assets/production/assets/null_light.53585615.png'
                    width={200}
                    height={167}
                  ></Image>
                }
                description='数据为空'
              ></Empty>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Company
