import PicCard from '@/app/components/contest/PicCard'
import Rank from '@/app/components/contest/Rank'
import Wrapper from '@/app/components/contest/Wrapper'
import React from 'react'

const Contest = () => {
  return (
    <div className='flex flex-col items-center bg-[#fafafa]'>
      <div
        className='flex justify-center w-full'
        style={{
          backgroundImage: 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
        }}
      >
        <Wrapper></Wrapper>
      </div>
      <PicCard></PicCard>
      <div className='flex mt-5 gap-x-5  md:w-[750px] lg:w-[1170px] xl:w-[1500px] xl:pl-[150px] xl:pr-[150px]'>
        <div className='flex-1'>
          <Rank></Rank>
        </div>
        <div className='flex-1'>123</div>
      </div>
    </div>
  )
}

export default Contest
