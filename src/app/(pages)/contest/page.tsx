import PicCard from '@/app/components/contest/PicCard'
import Wrapper from '@/app/components/contest/Wrapper'
import React from 'react'

const Contest = () => {
  return (
    <div className='flex flex-col items-center'>
      <div
        className='flex justify-center w-full'
        style={{
          backgroundImage: 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
        }}
      >
        <Wrapper></Wrapper>
      </div>
      <PicCard></PicCard>
    </div>
  )
}

export default Contest
