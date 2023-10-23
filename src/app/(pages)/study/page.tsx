import React from 'react'
import Categories from '../../components/home/Categories'
import PanelCol from '../../components/home/PanelCol'

const Home = () => {
  return (
    <>
      <PanelCol></PanelCol>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1100px] mt-[50px] bg-white'>
        <Categories></Categories>
      </div>
    </>
  )
}

export default Home
