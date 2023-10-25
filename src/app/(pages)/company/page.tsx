'use client'

import Ads from '@/app/components/company/Ads'
import CompanyList from '@/app/components/company/CompanyList'
import HotSearch from '@/app/components/company/HotSearch'
import Navs from '@/app/components/company/Navs'
import { useReactive } from 'ahooks'

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
        <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px]'>
          <Ads></Ads>
          <CompanyList></CompanyList>
        </div>
      </div>
    </>
  )
}

export default Company
