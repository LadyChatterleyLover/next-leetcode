'use client'

import Categories from '../../components/study/Categories'
import dynamic from 'next/dynamic'

const PanelCol = dynamic(() => import('../../components/study/PanelCol'), { ssr: false })
const Home = () => {
  return (
    <>
      <PanelCol></PanelCol>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px] bg-white'>
        <Categories></Categories>
      </div>
    </>
  )
}

export default Home
